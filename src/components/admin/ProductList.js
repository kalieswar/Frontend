import { Fragment, useEffect } from "react"
import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import {toast} from "react-toastify"
import { getAdminProducts } from "../../actions/productActions";
import { clearError } from "../../slices/productsSlice";
import Loader from '../layouts/Loader';
import {MDBDataTable} from 'mdbreact';
import Sidebar from "./Sidebar";

export default function ProductList(){
const {products = [], loading= true, error}= useSelector(state => state.productsState)
const dispatch = useDispatch()
const setProducts = ()=>{
    const data = {
        columns : [
            {
                label: 'ID',
                field: 'id',
                sort: 'asc'
            },
            {
                label: 'NAME',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'PRICE',
                field: 'price',
                sort: 'asc'
            },
            {
                label: 'STOCK',
                field: 'stock',
                sort: 'asc'
            },
            {
                label: 'ACTIONS',
                field: 'actions',
                sort: 'asc'
            },
        ],
        rows:[]
    }
    products.forEach(product=>{
        data.rows.push({
            id: product._id,
            name: product.name,
            price: `$${product.price}`,
            stock: product.stock,
            actions:(
                <Fragment>
                    <Link to={`/admin/product/${product._id}`} className='btn btn-primary'><i className="fa fa-pencil"></i></Link>
                    <Button className="btn btn-danger py-1 px-2 ms-2">
                        <i className="fa fa-trash"></i>
                    </Button>
                </Fragment>
            )
        })
    })
    return data;
}
useEffect(()=>{
    if(error){
        toast(error,{
            position: toast.POSITION.BOTTOM_CENTER,
            type:'error',
            onOpen: ()=> {dispatch(clearError())}
        })
        return
    }
    dispatch(getAdminProducts)
},[dispatch])
    return(
        <div className="row">
            <div className="col-12 col-md-2 ">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10 col-sm-12">
                <h1 className="my-4">Product List</h1>
                <Fragment>
                    {loading ? <Loader/> :
                    <MDBDataTable
                    data={setProducts()}
                    bordered
                    striped
                    hover
                    className="px-3"
                    />
                    }
                </Fragment>
            </div>
        </div>
    )
}