import React from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { motion } from "framer-motion";
import { useStateValue } from "../../redux/StateProvider";
import { ADD_TO_CART } from "../../redux/action.types";
import "./Product.styles.css";

function Product({ id, title, price, rating, image }) {
	const [{}, dispatch] = useStateValue();

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

	const variants = {
		hidden: {
			scale: 0.9,
			opacity: 0
		},
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				delay: 0.2
			}
		}
	};

	return (
		<motion.div key={id} className='product' initial='hidden' animate='visible' variants={variants}>
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
		</motion.div>
	);
}

export default Product;
