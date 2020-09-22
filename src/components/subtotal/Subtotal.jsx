import React from "react";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../redux/StateProvider";
import { getCartTotalPrice } from "../../utils/cart.utils";
import SubtotalText from "../subtotalText/SubtotalText";
import "./Subtotal.styles.css";

function Subtotal() {
	// pull cart items from the data layer.
	const [{ cart }, dispatch] = useStateValue();

	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={(formattedValue) => (
					<React.Fragment>
						<SubtotalText cart={cart} formattedValue={formattedValue} />
						<small className='subtotal__gift'>
							<input type='checkbox' />
							<span className='subtotal__giftText'>This order contains a gift</span>
						</small>
					</React.Fragment>
				)}
				decimalScale={2}
				value={getCartTotalPrice(cart)}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
			<button className='subtotal__checkoutButton'>Proceed to checkout</button>
		</div>
	);
}

export default Subtotal;
