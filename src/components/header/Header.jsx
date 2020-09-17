import React from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import "./Header.styles.css";

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
	return (
		<div className='header'>
			<div className='header__logoContainer'>
				<Link to='/'>
					<img
						className='header__logo'
						src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
						alt='Amazon Logo'
					/>
				</Link>
			</div>
			<div className='header__search'>
				<input type='text' className='header__searchInput' />
				<SearchIcon className='header__searchIcon' />
			</div>

			<div className='header__nav'>
				<div className='header__menuItem'>
					<span className='header__menuItemTextOne'>Hello Guess</span>
					<span className='header__menuItemTextTwo'>Sign In</span>
				</div>
				<div className='header__menuItem'>
					<span className='header__menuItemTextOne'>Returns</span>
					<span className='header__menuItemTextTwo'>& Orders</span>
				</div>
				<div className='header__menuItem'>
					<span className='header__menuItemTextOne'>Your</span>
					<span className='header__menuItemTextTwo'>Prime</span>
				</div>
				<Link to='/checkout'>
					<div className='header__menuBasket'>
						<StyledBadge badgeContent={0}>
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
