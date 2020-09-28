import React from "react";
import CurrencyFormat from "react-currency-format";
import { motion } from "framer-motion";
import CartItem from "../cartItem/CartItem";
import Subtotal from "../subtotal/Subtotal";
import SubtotalText from "../subtotalText/SubtotalText";
import CartEmpty from "../cartEmpty/CartEmpty";
import { useStateValue } from "../../redux/StateProvider";
import { getCartTotalPrice } from "../../utils/cart.utils";
import "./Checkout.styles.css";

function Checkout() {
	// Use `const [state, dispatch] = useStateValue()` way if you needed both state and dispatch.
	// Otherwise use like following way to get either state or dispatch.
	const { cart, currentUser } = useStateValue()[0];

	const cartItemsContainer = {
		hidden: {
			transition: {
				staggerChildren: 0.1
			}
		},
		visible: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	return (
		<div className='checkout'>
			<div className='checkout__left'>
				<img
					className='checkout__ad'
					src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
					alt='Advertisement'
				/>
				<div>
					{cart.length ? (
						<React.Fragment>
							{currentUser ? (
								<h1 className='checkout__title'>
									<span className='checkout__name'>{`Hello, ${currentUser?.displayName}`}</span>
									<br />
									Your Shopping Cart
								</h1>
							) : (
								<h1 className='checkout__title'>Shopping Cart</h1>
							)}
							<motion.div variants={cartItemsContainer} initial='hidden' animate='visible'>
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
							</motion.div>
							<div className='checkout__listSubtotal'>
								<CurrencyFormat
									renderText={(formattedValue) => (
										<SubtotalText cart={cart} formattedValue={formattedValue} />
									)}
									decimalScale={2}
									value={getCartTotalPrice(cart)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"$"}
								/>
							</div>
						</React.Fragment>
					) : (
						<CartEmpty currentUser={currentUser} />
					)}
				</div>
			</div>
			<div className='checkout__right'>
				<Subtotal />
			</div>
		</div>
	);
}

export default Checkout;
