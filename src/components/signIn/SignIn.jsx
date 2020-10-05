import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import "./SignIn.styles.css";

function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const signInHandler = async (event) => {
		event.preventDefault();

		try {
			await auth.signInWithEmailAndPassword(email, password);
			history.goBack();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='signin'>
			<Link to='/'>
				<img
					className='signin__logo'
					src='https://pngimg.com/uploads/amazon/amazon_PNG24.png'
					alt='Amazon Logo'
				/>
			</Link>
			<div className='signin__container'>
				<h1 className='signin__title'>Sign-In</h1>
				<form className='signin__form'>
					<label className='signin__label' htmlFor='email'>
						Email
					</label>
					<input
						className='signin__input'
						type='text'
						name='email'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<label className='signin__label' htmlFor='password'>
						Password
					</label>
					<input
						className='signin__input'
						type='password'
						name='password'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<button className='signin__button' type='submit' onClick={signInHandler}>
						Sign-In
					</button>
				</form>
				<p className='signin__agreement'>
					By continuing, you agree to Amazon Clone Conditions of Use and Privacy Notice.
				</p>
			</div>
			<h5 className='signin__divider'>
				<span>New to Amazon?</span>
			</h5>
			<Link to='/register'>
				<button className='signin__registerButton'>Create your Amazon account</button>
			</Link>
			<div className='signin__footerDivider'></div>
		</div>
	);
}

export default SignIn;
