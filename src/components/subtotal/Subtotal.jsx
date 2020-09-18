import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../redux/StateProvider";
import "./Subtotal.styles.css";

function Subtotal() {
	// pull cart items from the data layer.
	const [{ cart }, dispatch] = useStateValue();

	// calculate total price of items in the cart.
	const calculateTotalPrice = () => {
		return cart.reduce((sumPrice, currentItem) => currentItem.price + sumPrice, 0);
	};

	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={(formattedValue) => (
					<>
						<p className='subtotal__text'>
							Subtotal ({cart.length} items): <strong>{formattedValue}</strong>
						</p>
						<small className='subtotal__gift'>
							<input type='checkbox' />
							<span className='subtotal__giftText'>This order contains a gift</span>
						</small>
					</>
				)}
				decimalScale={2}
				value={calculateTotalPrice()}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
			<button className='subtotal__checkoutButton'>Proceed to checkout</button>
		</div>
	);
}

export default Subtotal;
