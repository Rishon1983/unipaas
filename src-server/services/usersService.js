import usersData from "../models/usersModel.js";
import {EMAIL} from "../config/config.js";

const updateUsersData = (data) => {
	if (!data) return;
	// const email = data?.consumer.email;
	const consumerId = data?.consumer.consumerId;
	const authorizationId = data?.authorizationId;

	console.log('authorizationId --->', authorizationId);

	if (usersData[EMAIL]) {
		usersData[EMAIL].consumerId = consumerId; // update consumerId
		usersData[EMAIL].paymentOption = data?.paymentOption; // update paymentOption
		usersData[EMAIL].authorizations.push(authorizationId); // add authorizationId to authorizations
	} else {
		usersData[EMAIL] = {
			consumerId,
			paymentOption: data?.paymentOption,
			authorizations: [authorizationId] // initialize authorizations with authorizationId
		};
	}
}

const getConsumerId = (email) => {
	return usersData[email]?.consumerId || '';
};

const getPaymentOption = (email) => {
	return usersData[email]?.paymentOption;
};

export {
	updateUsersData,
	getConsumerId,
	getPaymentOption
};