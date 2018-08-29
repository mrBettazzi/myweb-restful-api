// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var winston = require('winston');
var compression = require('compression');
var expressWinston = require('express-winston');
var winstonPapertrail = require('winston-papertrail');
var jwt = require('express-jwt');
var mongoose = require('mongoose');

// DB configuration
var dbconf = require('./database/DB');

// log configuration
// var config = require('./config');
// var logger = require('./utils/logger');

// initialize API using express
var api = express();                 
// configure app to use cors() - this will let us get the data from a different web server
api.use(cors());
// configure app to use bodyParser() - // this will let us get the data from a POST
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use(compression());

// ignore authentication on the following routes
/*
api.use(
	jwt({ secret: config.jwt.secret }).unless({
		path: [
			'/',
			'/auth/signup',
			'/auth/login',
			'/auth/forgot-password',
			'/auth/reset-password',
		],
	}),
);
*/

// initialize logger (in our case, winston + papertrail)
/*
api.use(
	expressWinston.logger({
		transports: [
			new winston.transports.Papertrail({
				host: config.logger.host,
				port: config.logger.port,
				level: 'error',
			}),
		],
		meta: true,
	}),
);
*/

// connect to database
mongoose.connect(dbconf.DB).then(
	() => {console.log('Database is connected')},
	err => {console.log('Cannot connect to database ' + err)}
); 

// set the listening port
var port = process.env.SERVERPORT || 4200;
// start the server
api.listen(port, function(){
	console.log('REST API Server is running on port ' + port);
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
// app.use('/api', router);

// all our models ...
// WAS :
// var Amb = require('./routes/AmbRouter');
// NOW IS :
// loop through all routes and dynamically require them – passing api
fs.readdirSync(path.join(__dirname, 'routes')).map(file => {
	require('./routes/' + file);
});


