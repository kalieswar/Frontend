import { Link, useNavigate } from "react-router-dom";

export default function Product({product, col}) {
    const navigate = useNavigate()
    return (
        <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded" onClick={()=>navigate(`/product/${product._id}`)} style={{cursor:"pointer"}}>
                <img
                    onClick={()=>navigate(`/product/${product._id}`)}
                    className="card-img-top mx-auto"
                    style={{cursor:"pointer"}}
                    alt={product.name}
                    src={product.images[0].image}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h5>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${product.ratings / 5 * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews})</span>
                    </div>
                    <p className="card-text">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details </Link>
                </div>
            </div>
        </div>
    )
}