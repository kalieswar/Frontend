import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Search from './Search';
import { DropdownButton, Dropdown, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const { isAuthenticated, user } = useSelector(state => state.authState);
    const {items:cartItems}= useSelector(state=> state.cartState)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = ()=>{
        dispatch(logout);
    }
    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/">
                        <img width="150px" alt="" src="/images/Maxgrocery.jpeg" />
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
                <Search />
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {isAuthenticated ? 
                (
                    <Dropdown className='d-inline'>
                        <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
                            <figure className='avatar avatar-nav'>
                                <Image width="50px" src={user.avatar ?? './images/default_avatar.jpg'}/>
                            </figure>
                            <span>{user.name}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={()=> {navigate('/myprofile')}} className='text-warning'>My Profile</Dropdown.Item>
                            <Dropdown.Item onClick={()=> {navigate('/orders')}} className='text-warning'>Orders</Dropdown.Item>
                            <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )
                 :
                    <Link to="/login" className="btn" id="login_btn">Login</Link>
                }
                <Link to="/cart">
                <span id="cart" className="ms-3">
                    <i className="fa-solid fa-cart-shopping"></i>
                </span></Link>
                <span className="ms-1" id="cart_count">{cartItems.length}</span>
            </div>
        </nav>
    )
}