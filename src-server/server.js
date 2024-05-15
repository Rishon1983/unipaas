import express from 'express';
import axios from 'axios';
import initRoutes from "./routes/init.js";

const app = express();

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

initRoutes(app);

app.listen(80, () => {
	console.log('Main Server started ');
});