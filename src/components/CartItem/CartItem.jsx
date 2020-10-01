import React from "react";
import { motion } from "framer-motion";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useStateValue } from "../../redux/StateProvider";
import "./CartItem.styles.css";
import { CHANGE_ITEM_QUANTITY, REMOVE_FROM_CART } from "../../redux/action.types";

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

function CartItem({ id, title, price, rating, image, quantity, divider }) {
	// Use `const [state, dispatch] = useStateValue()` way if needed both state and dispatch.
	// Otherwise use like following way to get either state or dispatch.
	const dispatch = useStateValue()[1];

	const cartItems = {
		hidden: {
			scale: 0,
			transition: {
				duration: 0.3
			}
		},
		visible: {
			scale: 1,
			transition: {
				duration: 0.3
			}
		}
	};

	const removeFromCart = () => {
		dispatch({
			type: REMOVE_FROM_CART,
			id
		});
	};

	const quantityChangeHandler = (event) => {
		dispatch({
			type: CHANGE_ITEM_QUANTITY,
			item: {
				id: id,
				quantity: event.target.value
			}
		});
	};

	return (
		<motion.div key={id} className={`cartItem ${divider ? "divider" : ""}`} variants={cartItems}>
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
						onChange={quantityChangeHandler}
					/>
					<button className='cartItem__removeFromCartButton' onClick={removeFromCart}>
						Remove from cart
					</button>
				</div>
			</div>
		</motion.div>
	);
}

export default CartItem;
