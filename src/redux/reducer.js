import { addItemToCart } from "../utils/cart.utils";
import { ADD_TO_CART } from "./action.types";

export const initialState = {
	cart: []
};

const reducer = (state, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			return {
				...state,
				cart: addItemToCart(state.cart, action.item)
			};
		default:
			return state;
	}
};

export default reducer;
