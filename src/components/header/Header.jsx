import React from "react";
import { Link, useHistory } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./Header.styles.css";
import { useStateValue } from "../../redux/StateProvider";
import { getTotalCartItems } from "../../utils/cart.utils";
import { auth } from "../../firebase/firebase.config";

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: "#f08804",
		fontFamily: "inherit",
		fontSize: "14px",
		fontWeight: "600",
		color: "white"
	}
}))(Badge);

function Header() {
	// Use `const [state, dispatch] = useStateValue()` way if needed both state and dispatch.
	// Otherwise use like following way to get either state or dispatch.
	const { cart, currentUser } = useStateValue()[0];
	const history = useHistory();

	const signOutHandler = () => {
		if (currentUser) {
			auth.signOut();
			history.push("/");
		} else {
			history.push("/signin");
		}
	};

	return (
		<div className='header'>
			<Link to='/'>
				<div className='header__logoContainer'>
					<img
						className='header__logo'
						src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
						alt='Amazon Logo'
					/>
				</div>
			</Link>
			<div className='header__search'>
				<input type='text' className='header__searchInput' />
				<SearchIcon className='header__searchIcon' />
			</div>

			<div className='header__nav'>
				<div className='header__menuItem' onClick={signOutHandler}>
					<span className='header__menuItemTextOne'>
						Hello {currentUser ? currentUser?.displayName : "Guest"}
					</span>
					<span className='header__menuItemTextTwo'>{currentUser ? "Sign Out" : "Sign In"}</span>
				</div>
				<Link to={currentUser ? "/orders" : "/signin"}>
					<div className='header__menuItem'>
						<span className='header__menuItemTextOne'>Returns</span>
						<span className='header__menuItemTextTwo'>& Orders</span>
					</div>
				</Link>
				<div className='header__menuItem'>
					<span className='header__menuItemTextOne'>Your</span>
					<span className='header__menuItemTextTwo'>Prime</span>
				</div>
				<Link to='/checkout' style={{ textDecoration: "none" }}>
					<div className='header__menuBasket'>
						<StyledBadge badgeContent={getTotalCartItems(cart)}>
							<ShoppingCartOutlinedIcon className='header__basketIcon' />
						</StyledBadge>
						<div className='header__basketText'>Cart</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;
