import express from 'express';
import axios from 'axios';
import initRoutes from "./routes/init.js";
import {updateAuthorizationStatusesForAllUsers} from "./scripts/authorizationsVerification.js";

const app = express();

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

initRoutes(app);

app.listen(80, () => {
	console.log('Main Server started ');
});

// Run the function immediately, and then every 5 minutes
updateAuthorizationStatusesForAllUsers();
setInterval(updateAuthorizationStatusesForAllUsers, 5 * 60 * 1000);