import React from "react";
import { motion } from "framer-motion";
import Product from "../product/Product";
import "./Home.styles.css";

function Home() {
	return (
		<div className='home'>
			<div className='home__container'>
				<motion.img
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className='home__image'
					src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_1x._CB432458380_.jpg'
					alt='Home banner'
				/>
				<div className='home__productRow'>
					<Product
						id='12332145'
						title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
						price={14.99}
						rating={4.5}
						image='https://m.media-amazon.com/images/I/81-QB7nDh4L._AC_UY218_.jpg'
					/>
					<Product
						id='45665478'
						title='Stand Mixer 8 Speeds Electric Kitchen Mixer 6QT Stainless Steel Bowl with Double Dough Hooks,Wire Whip,Flat Beater,Pouring Shield,Automatic Tilt-Head(Coke Red)'
						price={139.99}
						rating={4}
						image='https://m.media-amazon.com/images/I/71vEKuSvnGL._AC_UY218_.jpg'
					/>
				</div>
				<div className='home__productRow'>
					<Product
						id='34554376'
						title='AUKEY Car Phone Mount 360 Degree Rotation Dashboard Magnetic Cell Phone Holder for Car Compatible with iPhone 11 Pro Max / 11 / XS Max/XS / 8/7, Samsung Galaxy S10+, Google Pixel 3 XL, and More'
						price={15.29}
						rating={4.5}
						image='https://m.media-amazon.com/images/I/71tD1M4zgSL._AC_UY218_.jpg'
					/>
					<Product
						id='42354390'
						title='Certified Refurbished Echo (3rd Gen)- Smart speaker with Alexa- Charcoal'
						price={89.99}
						rating={4.5}
						image='https://m.media-amazon.com/images/I/61Gob-M3snL._AC_UY218_.jpg'
					/>
					<Product
						id='67887609'
						title='Apple iPad (10.2-Inch, Wi-Fi, 128GB) - Space Gray (Latest Model) (Renewed)'
						price={394.99}
						rating={3.5}
						image='https://m.media-amazon.com/images/I/61mXrcMU6LL._AC_UY218_.jpg'
					/>
				</div>
				<div className='home__productRow'>
					<Product
						id='65412321'
						title='Samsung C49J890DKU 49" LED Curved Black Computer Monitor'
						price={1501.73}
						rating={4.5}
						image='https://m.media-amazon.com/images/I/71RC3o90shL._AC_UY218_.jpg'
					/>
				</div>
			</div>
		</div>
	);
}

export default Home;
