import React from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./Product.styles.css";

function Product({ title, price, rating, image }) {
	return (
		<div className='product'>
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
			<img className='product__image' src={image} alt='Lean Startup' />
			<button className='product__addToCartButton'>Add to Cart</button>
		</div>
	);
}

export default Product;
