import React from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./CartItem.styles.css";

const CustomNumberInput = withStyles((theme) => ({
	root: {
		"& .MuiTypography-root": {
			fontSize: 15,
			fontFamily: "inherit",
			color: "#111111"
		},
		borderRadius: 7,
		position: "relative",
		backgroundColor: "#F0F2F2",
		border: "1px solid #ced4da",
		fontSize: 15,
		color: "#111111",
		width: "95px",
		height: "30px",
		padding: "0px 5px 0px 11px",
		boxShadow: "0 2px 5px rgba(15,17,17,.15)",
		marginRight: "20px",
		"&.Mui-focused": {
			outline: 0,
			borderColor: "#007185",
			boxShadow: "0 0 0 3px #C8F3FA",
			background: "#EDFDFF",
			color: "#0F1111"
		}
	}
}))(InputBase);

function CartItem({ id, title, price, rating, image, quantity }) {
	const removeFromCart = () => {
		console.log("Removed");
	};

	return (
		<div key={id} className='cartItem'>
			<img className='cartItem__image' src={image} alt='cart item' />
			<div className='cartItem__details'>
				<p className='cartItem__title'>{title}</p>
				<div className='cartItem__rating'>
					<Rating
						name='customized-empty'
						defaultValue={0}
						value={rating}
						precision={0.5}
						emptyIcon={<StarBorderIcon fontSize='inherit' />}
						readOnly
					/>
				</div>
				<p className='cartItem__price'>
					<strong>${price}</strong>
				</p>
				<div className='cartItem__actions'>
					<CustomNumberInput
						id='standard-number'
						label='Number'
						type='number'
						defaultValue={quantity}
						startAdornment={<InputAdornment position='start'>Qty:</InputAdornment>}
						inputProps={{ min: 1 }}
					/>
					<button className='cartItem__removeFromCartButton' onClick={removeFromCart}>
						Remove from cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
