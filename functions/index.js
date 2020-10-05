const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_z4p8fhuDRG3uPI61L0gCD7HS009fWBr5Ox");

// API

// Application configuration
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
	const total = req.query.total;
	const { name, email, address } = req.body;

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total, // price in subunits of currency.
		currency: "usd",
		receipt_email: email,
		shipping: {
			name: name,
			address: {
				line1: address
			}
		}
	});

	// OK - Created
	res.status(201).send({
		clientSecret: paymentIntent.client_secret
	});
});

// Listen command
exports.api = functions.https.onRequest(app);
