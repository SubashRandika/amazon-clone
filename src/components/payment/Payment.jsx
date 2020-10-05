import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ContentEditable from "react-contenteditable";
import CurrencyFormat from "react-currency-format";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Skeleton from "@material-ui/lab/Skeleton";
import Alert from "@material-ui/lab/Alert";
import axios from "../../http/axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CartItem from "../cartItem/CartItem";
import { useStateValue } from "../../redux/StateProvider";
import { CLEAR_CART } from "../../redux/action.types";
import { getCartTotalPrice, getTotalCartItems } from "../../utils/cart.utils";
import { db } from "../../firebase/firebase.config";
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
	const [{ cart, currentUser }, dispatch] = useStateValue();
	const totalCartItems = getTotalCartItems(cart);
	const addressInput = useRef("Please enter your delivery address here");
	const [address, setAddress] = useState("");
	const classes = useStyles();
	const history = useHistory();
	const stripe = useStripe();
	const elements = useElements();
	const [error, setError] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [succeeded, setSucceeded] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
		// generate stripe special secret key that allows us to charge from customer.
		const getClientSecret = async () => {
			const response = await axios({
				method: "post",
				// stripe expect the total in a currencies subunits.
				// that is why dollar value need to multiply by 100.
				url: `/payments/create?total=${Math.round(getCartTotalPrice(cart) * 100)}`,
				data: {
					name: currentUser?.displayName,
					email: currentUser?.email,
					address: address
				}
			});

			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [cart, currentUser, address]);

	const handleAddressChange = (event) => {
		addressInput.current = event.target.value;
	};

	const handleAddressBlur = () => {
		setAddress(addressInput.current);
	};

	const handleCheckout = () => {
		history.push("/checkout");
	};

	const handlePaymentSubmit = async (event) => {
		// handle stripe payment processing work here.
		event.preventDefault();
		setProcessing(true);

		await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement)
				}
			})
			.then(({ paymentIntent }) => {
				// paymentIntent is Stripe payment confirmation.

				db.doc(`users/${currentUser?.id}`).collection("orders").doc(paymentIntent.id).set({
					cart: cart,
					amount: paymentIntent.amount,
					name: paymentIntent.shipping.name,
					address: paymentIntent.shipping.address.line1,
					currency: paymentIntent.currency,
					createdAt: paymentIntent.created
				});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: CLEAR_CART
				});

				// use replace over push here to coming back to payments page
				// by routing the user to orders page.
				history.replace("/orders");
			});
	};

	const handleCardInfoChange = (event) => {
		// listening to the card element changes
		// and display appropriate error as the customer types their card details.
		setDisabled(event?.empty);
		setError(event?.error ? event.error?.message : "");
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
								onBlur={handleAddressBlur}
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
						<div className='payment__details'>
							<form onSubmit={handlePaymentSubmit}>
								<CardElement onChange={handleCardInfoChange} />
								<div className='payment__priceContainer'>
									<CurrencyFormat
										renderText={(formattedValue) => (
											<p>
												Order Total:&nbsp;&nbsp;
												<span className='payment__priceValue'>{formattedValue}</span>
											</p>
										)}
										decimalScale={2}
										value={getCartTotalPrice(cart)}
										displayType={"text"}
										thousandSeparator={true}
										prefix={"$"}
									/>
									<button type='submit' disabled={processing || disabled || succeeded}>
										<span>{processing ? <p>Processing</p> : "Buy Now"}</span>
									</button>
								</div>
								{error && (
									<div className='payment__errorContainer'>
										<Alert severity='error'>{error}</Alert>
									</div>
								)}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
