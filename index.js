require('dotenv').config();
const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');
const errorHandler = require('./middlewares/error');
const { sequelize } = require('./models');

const PORT = process.env.PORT || 5000;

const app = express();
middlewares(app);
routes(app);
errorHandler(app);

sequelize
	.authenticate()
	.then(() => {
		app.listen(PORT, () => {
			console.log('Connection has been established successfully.');
		});
	})
	.catch((e) => console.error('Unable to connect to the database:', e));
