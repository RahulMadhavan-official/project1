
import './product.css';


const ProductCard=(props)=>{
    return(
        <div className="product-card" onClick={props.onClick}>
           <img src={props.image} alt="" />
           <h1>{props.name}</h1>
           <p>rating : {props.rating}</p>
           <h2>$ {props.price}</h2>
        </div>
    )
}
export default ProductCard;