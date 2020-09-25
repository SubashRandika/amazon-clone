import React from "react";
import { Link } from "react-router-dom";
import "./SignIn.styles.css";

function SignIn() {
	return (
		<div className='signin'>
			<Link to='/'>
				<img
					className='signin__logo'
					src='http://pngimg.com/uploads/amazon/amazon_PNG24.png'
					alt='Amazon Logo'
				/>
			</Link>
			<div className='signin__container'>
				<h1 className='signin__title'>Sign-In</h1>
				<form className='signin__form'>
					<label className='signin__label' htmlFor='email'>
						Email
					</label>
					<input className='signin__input' type='text' name='email' />
					<label className='signin__label' htmlFor='password'>
						Password
					</label>
					<input className='signin__input' type='password' name='password' />
					<button className='signin__button'>Sign-In</button>
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
