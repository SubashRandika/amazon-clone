import React from "react";
import "./CartEmpty.styles.css";

function CartEmpty() {
	return (
		<div className='cartEmpty'>
			<div className='cartEmpty__content'>
				<img
					className='cartEmpty__image'
					src='https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg'
					alt='cartEmpty'
				/>
				<div className='cartEmpty__info'>
					<h2 className='cartEmpty__title'>Your Amazon Cart is empty</h2>
					<p className='cartEmpty__description'>Shop our today's deals</p>
				</div>
			</div>
			<div className='cartEmpty__note'>
				<p>
					The price and availability of items at our store are subject to change. The Cart is a temporary
					place to store a list of your items and reflects each item's most recent price.
				</p>
				<p>
					Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time
					to pay.
				</p>
			</div>
			<div className='cartEmpty__footerShadeLine'></div>
		</div>
	);
}

export default CartEmpty;
