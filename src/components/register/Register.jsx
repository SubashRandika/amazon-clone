import React from "react";
import { Link } from "react-router-dom";
import "./Register.styles.css";

function Register() {
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
					<input className='register__input' type='text' name='name' />
					<label className='register__label' htmlFor='email'>
						Email
					</label>
					<input className='register__input' type='text' name='email' />
					<label className='register__label' htmlFor='password'>
						Password
					</label>
					<input
						className='register__input'
						type='password'
						name='password'
						placeholder='At least 6 characters'
					/>
					<div className='register__passwordInfo'>
						<i>i</i>
						<p>Passwords must be at least 6 characters.</p>
					</div>
					<label className='register__label' htmlFor='confirmPassword'>
						Re-enter password
					</label>
					<input className='register__input' type='password' name='confirmPassword' />
					<button className='register__button'>Create your Amazon account</button>
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
