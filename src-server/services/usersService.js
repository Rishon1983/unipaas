import usersData from "../models/usersModel.js";
import {EMAIL} from "../config/config.js";

const updateUsersData = (data) => {
	if (!data) return;
	// const email = data?.consumer.email;
	const consumerId = data?.consumer.consumerId;
	const authorization = {
		authorizationId: data.authorizationId,
		authorizationStatus: data.authorizationStatus,
	}

	if (usersData[EMAIL]) {
		usersData[EMAIL].consumerId = consumerId; // update consumerId
		usersData[EMAIL].paymentOption = data?.paymentOption; // update paymentOption
		usersData[EMAIL].authorizations.push(authorization);
	} else {
		usersData[EMAIL] = {
			consumerId,
			paymentOption: data?.paymentOption,
			authorizations: [authorization]
		};
	}

}

const getConsumerId = (email) => {
	return usersData[email]?.consumerId || '';
};

const getPaymentOption = (email) => {
	return usersData[email]?.paymentOption;
};
const getAuthorizations = (email) => {
	return usersData[email]?.authorizations;
};

const addAuthorizations = (email, authorization) => {
	if (!usersData[email]) {
		usersData[email] = {};
	}
	if (!usersData[email].authorizations) {
		usersData[email].authorizations = [];
	}
	usersData[email].authorizations.push(authorization);
};

export {
	updateUsersData,
	getConsumerId,
	getPaymentOption,
	getAuthorizations,
	addAuthorizations
};