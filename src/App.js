import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./components/checkout/Checkout";
import SignIn from "./components/signIn/SignIn";
import Register from "./components/register/Register";

function App() {
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
