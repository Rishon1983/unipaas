import {PRIVATE_KEY} from "../config/config.js";
import usersData from "../models/usersModel.js";
import axios from "axios";

const verifyAuthorization = async (authorizationId) => {
	let result = {};
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
	} catch (error) {
		console.error(error);
	}
	return result;
};

const updateAuthorizationStatusForUser = async (email) => {
	const user = usersData[email];
	if (!user || !user.authorizations || user.authorizations.length === 0) {
		console.error(`User with email ${email} not found or has no authorizations.`);
		return;
	}

	const authorizationIds = user.authorizations.map(auth => auth.authorizationId);
	try {
		const results = await getAllAuthorizationsByUser(authorizationIds);
		// Update authorization statuses in usersData
		results.forEach((result, index) => {
			console.log('user.authorizations[index].authorizationStatus --->', user.authorizations[index].authorizationStatus);
			console.log('result.authorizationStatus --->', result.authorizationStatus);
			if (user.authorizations[index].authorizationStatus !== result.authorizationStatus) {
				user.authorizations[index].authorizationStatus = result.authorizationStatus;

				console.log(`Authorization statuses updated for user with email ${email}`);
				//send mail to user
			}
		});
	} catch (error) {
		console.error("Error updating authorization statuses:", error);
	}
};

const getAllAuthorizationsByUser = async (authorizationIds) => {
	const promises = authorizationIds.map(authorizationId => verifyAuthorization(authorizationId));
	return await Promise.all(promises);
};

// Function to update authorization statuses for all users
const updateAuthorizationStatusesForAllUsers = () => {
	console.log("Updating authorization statuses for all users...");
	const userEmails = Object.keys(usersData);
	console.log('userEmails --->', userEmails);
	userEmails.forEach(userEmail => {
		updateAuthorizationStatusForUser(userEmail);
	});
};

export {
	updateAuthorizationStatusForUser,
	updateAuthorizationStatusesForAllUsers
};