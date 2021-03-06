export const addItemToCart = (cartItems, itemToAdd) => {
	const existingItem = cartItems.find((item) => item.id === itemToAdd.id);

	if (existingItem) {
		return cartItems?.map((item) => (item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item));
	}

	return [...cartItems, { ...itemToAdd, quantity: 1 }];
};

export const getTotalCartItems = (cartItems) => {
	return cartItems?.reduce((totalQuantity, currentItem) => totalQuantity + currentItem.quantity, 0);
};

export const getCartTotalPrice = (cartItems) => {
	return cartItems?.reduce((sumPrice, currentItem) => currentItem.price * currentItem.quantity + sumPrice, 0);
};

export const removeItemFromCart = (cartItems, id) => {
	return cartItems?.filter((cartItem) => cartItem.id !== id);
};

export const changeItemQuantity = (cartItems, item) => {
	return cartItems?.map((cartItem) =>
		cartItem.id === item.id ? { ...cartItem, quantity: Number(item.quantity) } : cartItem
	);
};
