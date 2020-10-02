import { addItemToCart, removeItemFromCart, changeItemQuantity } from "../utils/cart.utils";
import { ADD_TO_CART, REMOVE_FROM_CART, CHANGE_ITEM_QUANTITY, SET_SIGNIN_USER, CLEAR_CART } from "./action.types";

export const initialState = {
	cart: [],
	currentUser: null
};

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				cart: addItemToCart(state.cart, action.item)
			};
		case REMOVE_FROM_CART:
			return {
				...state,
				cart: removeItemFromCart(state.cart, action.id)
			};
		case CLEAR_CART:
			return {
				...state,
				cart: []
			};
		case CHANGE_ITEM_QUANTITY:
			return {
				...state,
				cart: changeItemQuantity(state.cart, action.item)
			};
		case SET_SIGNIN_USER:
			return {
				...state,
				currentUser: action.currentUser
			};
		default:
			return state;
	}
};

export default reducer;
