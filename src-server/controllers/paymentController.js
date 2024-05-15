import axios from 'axios';
import * as crypto from "node:crypto";
import {PRIVATE_KEY} from '../config/config.js';
import {addAuthorizations, getAuthorizations, getPaymentOption, updateUsersData} from '../services/usersService.js';
import {getConsumerId} from '../services/usersService.js';
import {EMAIL} from '../config/config.js';

const getInitData = (req, res) => {

	const amount = Math.floor(Math.random() * 100) + 1;
	const orderId = crypto.randomBytes(16).toString("hex");
	const consumerId = getConsumerId(EMAIL);
	const paymentOptions = getPaymentOption(EMAIL);
	const authorizations = getAuthorizations(EMAIL);

	res.json({
		amount,
		consumerId,
		paymentOptions,
		orderId,
		email: EMAIL,
		authorizations: authorizations || []
	});
};

const checkout = async (req, res) => {
	const data = req.body;
	const consumerId = data.consumerId || null;
	const orderId = data.orderId || '';
	const amount = data.amount || 0;
	const email = data.email || '';

	let result = {};

	const options = {
		method: 'POST',
		url: 'https://sandbox.unipaas.com/platform/pay-ins/checkout',
		headers: {
			'accept': 'application/json',
			'content-type': 'application/json',
			'authorization': `Bearer ${PRIVATE_KEY}`
		},
		data: {
			currency: 'GBP',
			disablePaymentMethods: {disableCard: false, disablePayByBank: false},
			amount: amount,
			orderId,
			country: 'GB',
			email,
			consumerId
		}
	};

	try {
		const response = await axios.request(options);
		result = response.data;

	} catch (error) {
		console.error(error);
	}

	res.json(result);
}

const verifyAuthorization = async (req, res) => {
	let result = {};
	const authorizationId = req.body?.authorizationId;
	const options = {
		method: 'GET',
		url: `https://sandbox.unipaas.com/platform/pay-ins/${authorizationId}`,
		headers: {
			'accept': 'application/json',
			'content-type': 'application/json',
			'authorization': `Bearer ${PRIVATE_KEY}`
		},
	};

	try {
		const response = await axios.request(options);
		result = response.data;

		// Call the updateUsersData function to update the user data
		// only if req.body.saveCard is true
		if (req.body && req.body.saveCard) {
			updateUsersData(result);
		} else {
			addAuthorizations(EMAIL, result);
		}

	} catch (error) {
		console.error(error);
	}

	res.json(result);
};

export default {
	getInitData,
	checkout,
	verifyAuthorization
};