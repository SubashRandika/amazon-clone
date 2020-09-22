import React from "react";
import { getTotalCartItems } from "../../utils/cart.utils";
import "./SubtotalText.styles.css";

function SubtotalText({ cart, formattedValue }) {
	return (
		<p className='subtotal__text'>
			Subtotal ({getTotalCartItems(cart)} items): <strong>{formattedValue}</strong>
		</p>
	);
}

export default SubtotalText;
