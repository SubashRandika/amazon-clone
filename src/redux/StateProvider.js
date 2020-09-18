import React, { createContext, useContext, useReducer } from "react";

// prepares the data layer.
export const StateContext = createContext();

// wrap the app and provides the data layer into it.
export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

// pull data from the data layer.
export const useStateValue = () => useContext(StateContext);
