import React from "react";
import CurrencyFormat from "react-currency-format";
import "./Subtotal.styles.css";

function Subtotal() {
	return (
		<div className='subtotal'>
			<CurrencyFormat
				renderText={(formattedValue) => (
					<>
						<p className='subtotal__text'>
							Subtotal (0 items): <strong>0</strong>
						</p>
						<small className='subtotal__gift'>
							<input type='checkbox' />
							<span className='subtotal__giftText'>This order contains a gift</span>
						</small>
					</>
				)}
				decimalScale={2}
				value={0}
				displayType={"text"}
				thousandSeparator={true}
				prefix={"$"}
			/>
			<button className='subtotal__checkoutButton'>Proceed to checkout</button>
		</div>
	);
}

export default Subtotal;
