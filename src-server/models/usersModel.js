/**
 * @description This file is used to store the user data.
 * @type {Object}
 * @property {string} key - The user id. Now we use the email as the key.
 * @property {Object} value - The user data.
 * @property {string} value.consumerId - The consumer id.
 * @property {Array} value.authorizations - The authorizations.
 *
 * Example:
 * gmail: {
 *     consumerId: "",
 *     orders: []
 *   }
 *
 * */
const usersData = {};

/**
 * @description This function is used to update the user data.
 * @param {string} email - The user's email.
 * @param {Object} data - The data to update.
 */

export default usersData;