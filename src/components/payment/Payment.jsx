import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import CartItem from "../cartItem/CartItem";
import { useStateValue } from "../../redux/StateProvider";
import { getTotalCartItems } from "../../utils/cart.utils";
import "./Payment.styles.css";

const useStyles = makeStyles((theme) => ({
	root: {
		"&.MuiChip-clickable.MuiChip-outlined:hover": {
			backgroundColor: "#fefaf6 !important",
			boxShadow: "0 0 3px 2px rgba(228,121,17,.5)"
		},
		"&.MuiChip-clickable.MuiChip-outlined:focus": {
			backgroundColor: "#fefaf6"
		},
		fontSize: "22px",
		height: "40px",
		borderRadius: "0",
		backgroundColor: "#fefaf6 !important"
	},
	label: {
		padding: "0 16px"
	},
	outlined: {
		border: "1px solid #e77600"
	},
	avatarColorDefault: {
		backgroundColor: "#f08804"
	},
	avatar: {
		color: "#ffffff !important",
		fontSize: "16px !important",
		fontWeight: "600 !important",
		width: "35px !important",
		height: "30px !important"
	}
}));

function Payment() {
	const { cart, currentUser } = useStateValue()[0];
	const totalCartItems = getTotalCartItems(cart);
	const addressInput = useRef("Please enter your delivery address here");
	const classes = useStyles();
	const history = useHistory();

	const handleAddressChange = (event) => {
		addressInput.current = event.target.value;
	};

	const handleCheckout = () => {
		history.push("/checkout");
	};

	return (
		<div className='payment'>
			<div className='payment__container'>
				<div className='payment__header'>
					<span>Checkout</span>
					<Chip
						avatar={
							<Avatar classes={{ colorDefault: classes.avatarColorDefault }}>
								{totalCartItems > 99 ? `99+` : totalCartItems}
							</Avatar>
						}
						label='Items'
						clickable
						component='a'
						onClick={handleCheckout}
						variant='outlined'
						classes={{
							root: classes.root,
							label: classes.label,
							outlined: classes.outlined,
							avatar: classes.avatar
						}}
					/>
				</div>
				<div className='payment__detailsContainer'>
					<div className='payment__section'>
						<div className='payment__title'>
							<h3>Delivery address</h3>
						</div>
						<div className='payment__recipientInfo'>
							<span>
								{currentUser ? (
									`${currentUser.displayName} - ${currentUser.email}`
								) : (
									<Skeleton variant='text' width='25%' />
								)}
							</span>
							<ContentEditable
								className='payment__address'
								html={addressInput.current}
								onChange={handleAddressChange}
							/>
						</div>
					</div>
					<div className='payment__section'>
						<div className='payment__title'>
							<h3>Review items and delivery</h3>
						</div>
						<div className='payment__items'>
							{cart.map(({ id, title, price, rating, image, quantity }) => (
								<CartItem
									key={id}
									id={id}
									title={title}
									price={price}
									rating={rating}
									image={image}
									quantity={quantity}
								/>
							))}
						</div>
					</div>
					<div className='payment__section'>
						<div className='payment__title'>
							<h3>Payment method</h3>
						</div>
						<div className='payment__details'></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
