import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Checkout from "./components/checkout/Checkout";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";
import Payment from "./components/payment/Payment";
import Orders from "./components/orders/Orders";
import { auth } from "./firebase/firebase.config";
import { createUserProfileDocument } from "./utils/firebase.utils";
import { useStateValue } from "./redux/StateProvider";
import { SET_SIGNIN_USER } from "./redux/action.types";
import "./App.css";

const stripePromise = loadStripe("pk_test_N7GUSB4MKV5tsYZzobSy2LIF00R3KCLVAD");

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
					<Route path='/orders'>
						<Header />
						<Orders />
					</Route>
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
					<Route path='/payment'>
						<Header />
						<Elements stripe={stripePromise}>
							<Payment />
						</Elements>
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
