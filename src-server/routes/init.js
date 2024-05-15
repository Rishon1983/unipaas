import express from 'express';
import path from "path";
import PaymentRouter from "./paymentRouter.js";

const __dirname = path.resolve();
const publicDir = path.join(__dirname, '../dist');

const initRoutes = (app) => {
	app.use(express.json());
	app.use(express.static(publicDir));
	app.use(express.urlencoded({extended: true}));

	app.use((req, res, next) => {

		// Website you wish to allow to connect
		res.setHeader('Access-Control-Allow-Origin', '*');

		// Request methods you wish to allow
		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

		// Request headers you wish to allow
		res.setHeader('Access-Control-Allow-Headers', '*');

		// Set to true if you need the website to include cookies in the requests sent
		// to the API (e.g. in case you use sessions)
		res.setHeader('Access-Control-Allow-Credentials', true);

		// Pass to next layer of middleware
		next();
	});

	app.use(PaymentRouter);


	app.get('/api/*', (req, res) => {
		res.write(`404`);
		res.end();
	});

	app.get('/*', function (req, res) {
		res.sendfile('index.html', {root: publicDir});
	});
};

export default initRoutes;