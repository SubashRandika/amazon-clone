import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import { db } from "../../firebase/firebase.config";
import { useStateValue } from "../../redux/StateProvider";
import Order from "../order/Order";
import "./Orders.styles.css";

const useStyles = makeStyles({
	containerRoot: {
		padding: "10px",
		border: "1px solid #D5D9D9",
		borderRadius: "8px"
	},
	tableCellHead: {
		color: "#007185",
		fontFamily: "inherit",
		fontWeight: "600"
	},
	tableCellRoot: {
		borderBottom: "1px solid #D5D9D9"
	},
	tableRowRoot: {
		"& > .MuiTableCell-root": {
			borderBottom: 0
		}
	}
});

function Orders() {
	const { currentUser } = useStateValue()[0];
	const [orders, setOrders] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		if (currentUser) {
			db.doc(`users/${currentUser?.id}`)
				.collection("orders")
				.orderBy("createdAt", "desc")
				.onSnapshot((snapshot) => {
					setOrders(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data()
						}))
					);
				});
		} else {
			setOrders([]);
		}
	}, [currentUser]);

	return (
		<div className='orders'>
			<h1 className='orders__title'>Your Orders</h1>
			<TableContainer component='div' classes={{ root: classes.containerRoot }}>
				<Table aria-label='collapsible table'>
					<TableHead>
						<TableRow>
							<TableCell
								align='left'
								classes={{ root: classes.tableCellRoot, head: classes.tableCellHead }}
							>
								ID
							</TableCell>
							<TableCell
								align='left'
								classes={{ root: classes.tableCellRoot, head: classes.tableCellHead }}
							>
								Name
							</TableCell>
							<TableCell
								align='left'
								classes={{ root: classes.tableCellRoot, head: classes.tableCellHead }}
							>
								Delivery Address
							</TableCell>
							<TableCell
								align='right'
								classes={{ root: classes.tableCellRoot, head: classes.tableCellHead }}
							>
								Total Price
							</TableCell>
							<TableCell
								align='right'
								classes={{ root: classes.tableCellRoot, head: classes.tableCellHead }}
							>
								Currency
							</TableCell>
							<TableCell
								align='right'
								classes={{ root: classes.tableCellRoot, head: classes.tableCellHead }}
							>
								Date & Time
							</TableCell>
							<TableCell
								align='center'
								classes={{ root: classes.tableCellRoot, head: classes.tableCellHead }}
							>
								Purchases
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.length > 0 ? (
							orders.map((order) => <Order key={order.id} order={order} />)
						) : (
							<TableRow classes={{ root: classes.tableRowRoot }}>
								<TableCell align='center' colSpan={7}>
									No processed orders yet.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

export default Orders;
