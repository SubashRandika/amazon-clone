import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import { createUserProfileDocument } from "../../utils/firebase.utils";
import "./Register.styles.css";

function Register() {
	const [displayName, setDisplayName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const history = useHistory();

	const registerHandler = async (event) => {
		event.preventDefault();

		if (password !== confirmPassword) {
			alert("Passwords don't match.");
			return;
		}

		try {
			const { user } = await auth.createUserWithEmailAndPassword(email, password);
			await createUserProfileDocument(user, { displayName });
			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='register'>
			<Link to='/'>
				<img
					className='register__logo'
					src='http://pngimg.com/uploads/amazon/amazon_PNG24.png'
					alt='Amazon Logo'
				/>
			</Link>
			<div className='register__container'>
				<h1 className='register__title'>Create account</h1>
				<form className='register__form'>
					<label className='register__label' htmlFor='name'>
						Your name
					</label>
					<input
						className='register__input'
						type='text'
						name='name'
						value={displayName}
						onChange={(event) => setDisplayName(event.target.value)}
					/>
					<label className='register__label' htmlFor='email'>
						Email
					</label>
					<input
						className='register__input'
						type='text'
						name='email'
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<label className='register__label' htmlFor='password'>
						Password
					</label>
					<input
						className='register__input'
						type='password'
						name='password'
						placeholder='At least 6 characters'
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<div className='register__passwordInfo'>
						<i>i</i>
						<p>Passwords must be at least 6 characters.</p>
					</div>
					<label className='register__label' htmlFor='confirmPassword'>
						Re-enter password
					</label>
					<input
						className='register__input'
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
					/>
					<button className='register__button' type='submit' onClick={registerHandler}>
						Create your Amazon account
					</button>
					<p className='register__agreement'>
						By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
					</p>
					<div className='register__divider'></div>
					<div className='register__signinContainer'>
						<p>Already have an account?</p>
						<Link to='/signin'>Sign-In</Link>
					</div>
				</form>
			</div>
			<div className='register__footerDivider'></div>
		</div>
	);
}

export default Register;
