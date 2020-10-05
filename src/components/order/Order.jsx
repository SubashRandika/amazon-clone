import React, { useState } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import TableCell from "@material-ui/core/TableCell";
import { Table, TableBody, TableHead } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import "./Order.styles.css";

const useStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset"
		}
	},
	tableCellBody: {
		color: "#111111"
	},
	innerTableHead: {
		color: "#111111",
		fontFamily: "inherit",
		fontWeight: "600"
	},
	tableCellPriceBody: {
		color: "#B12704"
	},
	typographyRoot: {
		color: "#007185",
		fontFamily: "inherit",
		fontWeight: "600",
		textAlign: "center"
	},
	tableRowRoot: {
		"&:last-child > .MuiTableCell-root": {
			borderBottom: 0
		}
	},
	tableCellFooterRoot: {
		"&:last-child > .MuiTableCell-root": {
			borderBottom: 0
		},
		"& > .MuiTableCell-root": {
			paddingBottom: 0,
			paddingTop: 0
		}
	},
	paperRoot: {
		padding: "10px"
	}
});

function Order({ order }) {
	const { id, data } = order;
	const { name, address, amount, cart, createdAt, currency } = data;
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [openPopper, setOpenPopper] = React.useState(false);
	const classes = useStyles();

	const handleOpenPopper = (event) => {
		setAnchorEl(event.currentTarget);
		setOpenPopper(true);
	};

	const handleClosePopper = (event) => {
		setAnchorEl(null);
		setOpenPopper(false);
	};

	return (
		<React.Fragment>
			<TableRow classes={{ root: classes.root }}>
				<TableCell classes={{ body: classes.tableCellBody }}>{id}</TableCell>
				<TableCell align='left' classes={{ body: classes.tableCellBody }}>
					{name ? name : "N/A"}
				</TableCell>
				<TableCell align='left' classes={{ body: classes.tableCellBody }}>
					{address ? address : "N/A"}
				</TableCell>
				<TableCell align='right' classes={{ body: classes.tableCellPriceBody }}>
					{amount / 100}
				</TableCell>
				<TableCell align='right' classes={{ body: classes.tableCellBody }}>
					{currency.toUpperCase()}
				</TableCell>
				<TableCell align='right' classes={{ body: classes.tableCellBody }}>
					{moment.unix(createdAt).format("MMMM Do YYYY, h:mma")}
				</TableCell>
				<TableCell align='center' classes={{ body: classes.tableCellBody }}>
					<IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
			</TableRow>
			<TableRow classes={{ root: classes.tableCellFooterRoot }}>
				<TableCell colSpan={7}>
					<Collapse in={open}>
						<Box margin={1}>
							<Typography
								variant='h6'
								gutterBottom
								component='div'
								classes={{ root: classes.typographyRoot }}
							>
								Purchased products
							</Typography>
							<Table size='small' aria-label='purchases'>
								<TableHead>
									<TableRow>
										<TableCell align='center' classes={{ head: classes.innerTableHead }}>
											Preview
										</TableCell>
										<TableCell align='left' classes={{ head: classes.innerTableHead }}>
											Name
										</TableCell>
										<TableCell align='center' classes={{ head: classes.innerTableHead }}>
											Rating
										</TableCell>
										<TableCell align='right' classes={{ head: classes.innerTableHead }}>
											Quantity
										</TableCell>
										<TableCell align='right' classes={{ head: classes.innerTableHead }}>
											Price
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{cart.map(({ id, image, price, quantity, rating, title }) => (
										<TableRow key={id} classes={{ root: classes.tableRowRoot }}>
											<TableCell align='center'>
												<img
													className='order__image'
													src={image}
													alt='Ordered cart item'
													onMouseEnter={handleOpenPopper}
													onMouseLeave={handleClosePopper}
												/>
												{anchorEl?.src ? (
													<Popper
														open={openPopper}
														anchorEl={anchorEl}
														placement='top-start'
														transition
														variant={4}
													>
														{({ TransitionProps }) => (
															<Fade {...TransitionProps} timeout={350}>
																<Paper classes={{ root: classes.paperRoot }}>
																	<img src={anchorEl.src} alt='' />
																</Paper>
															</Fade>
														)}
													</Popper>
												) : null}
											</TableCell>
											<TableCell align='left'>{title}</TableCell>
											<TableCell align='center'>
												<Rating
													name='customized-empty'
													defaultValue={0}
													value={rating}
													precision={0.5}
													emptyIcon={<StarBorderIcon fontSize='inherit' />}
													readOnly
												/>
											</TableCell>
											<TableCell align='right'>{quantity}</TableCell>
											<TableCell align='right' classes={{ body: classes.tableCellPriceBody }}>
												{price}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default Order;
