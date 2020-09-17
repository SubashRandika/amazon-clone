import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>
					<Route path='/checkout'>
						<Header />
						<h1>Checkout Page</h1>
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
