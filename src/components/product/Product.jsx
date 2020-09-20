import React from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./Product.styles.css";
import { useStateValue } from "../../redux/StateProvider";
import { ADD_TO_CART } from "../../redux/action.types";

function Product({ id, title, price, rating, image }) {
	const [{ cart }, dispatch] = useStateValue();

	// dispatch item into shopping cart here.
	const addToShoppingCart = () => {
		dispatch({
			type: ADD_TO_CART,
			item: {
				id,
				title,
				price,
				rating,
				image
			}
		});
	};

	return (
		<div key={id} className='product'>
			<div className='product__header'>
				<p>{title}</p>
				<p className='product__price'>
					<small>$</small>
					<strong>{price}</strong>
				</p>
				<div className='product__rating'>
					<Rating
						name='customized-empty'
						defaultValue={0}
						value={rating}
						precision={0.5}
						emptyIcon={<StarBorderIcon fontSize='inherit' />}
						readOnly
					/>
				</div>
			</div>
			<img className='product__image' src={image} alt='Product' />
			<button className='product__addToCartButton' onClick={addToShoppingCart}>
				Add to Cart
			</button>
		</div>
	);
}

export default Product;
