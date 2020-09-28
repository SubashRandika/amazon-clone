import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";
import { auth } from "./firebase/firebase.config";
import { createUserProfileDocument } from "./utils/firebase.utils";
import { useStateValue } from "./redux/StateProvider";
import { SET_SIGNIN_USER } from "./redux/action.types";

function App() {
	// Use `const [state, dispatch] = useStateValue()` way if needed both state and dispatch.
	// Otherwise use like following way to get either state or dispatch.
	const dispatch = useStateValue()[1];

	useEffect(() => {
		auth.onAuthStateChanged(async (authUser) => {
			if (authUser) {
				// user just logged in or user was logged in
				const userRef = await createUserProfileDocument(authUser);
				userRef.onSnapshot((snapshot) => {
					dispatch({
						type: SET_SIGNIN_USER,
						currentUser: {
							id: snapshot.id,
							...snapshot.data()
						}
					});
				});
			} else {
				// user not logged in
				dispatch({
					type: SET_SIGNIN_USER,
					currentUser: null
				});
			}
		});
	}, [dispatch]);

	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/register'>
						<Register />
					</Route>
					<Route path='/signin'>
						<SignIn />
					</Route>
					<Route path='/checkout'>
						<Header />
						<Checkout />
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
