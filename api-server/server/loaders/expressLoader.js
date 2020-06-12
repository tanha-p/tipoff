import express from 'express';
import addRequestId from 'express-request-id';
import helmet from 'helmet';
import path from 'path';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import router from '../../routes';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';

import log4js from 'log4js';
var log = log4js.getLogger("expressLoader");


export default async () => {
	var app = express();
	const start = process.hrtime.bigint(); //time in nanoseconds

	//track reponse time
	app.use((req, res, next) => {
		res.startRes = process.hrtime.bigint(); //time in nanoseconds
		res.once('finish', () => {
			const endRes = process.hrtime.bigint();
			const totalTime = Number((endRes-res.startRes)*1000n/1000000n)/1000;
			res.totalTime = totalTime;
			
		})
		next();
	});

	app.use(express.json({limit: '50mb'}));
	app.use(express.urlencoded({limit: '50mb', extended:false}));
	
	app.use(cookieParser());

	//Sanitize incoming input. Remove $ and . with _ to prevent nosql attack
	app.use(mongoSanitize({
		replaceWith: '_'
	}));

	// compress all responses
	app.use(compression())

	//setup incoming request rate
	const apiLimiter = rateLimit({
		windowMs: 1 * 60 * 1000, // 1 minute
		max: 50 //Max number of connections during windowMs milliseconds before sending a 429 response.
		//TODO implement store using rate-limit-mongo
	});
	app.use("/api/", apiLimiter);
	
	//define content security policy (CSP) here
	app.use(helmet.contentSecurityPolicy({
		directives: {
			defaultSrc: ["'self'", 'cdnjs.cloudflare.com'], //TODO remove external dependency
			imgSrc: ["'self'",'https:', 'data:'],
			scriptSrc: ["'self'", "'unsafe-inline'", 'cdnjs.cloudflare.com'],
			styleSrc: ["'self'","'unsafe-inline'",'use.fontawesome.com'],
			fontSrc: ["'self'", 'cdnjs.cloudflare.com'],
			reportUri: '/report-csp-violation',
			upgradeInsecureRequests: true,
			workerSrc: false  // This is not set.
		},
		loose: true
	}));
	
	//Route to report csp violations defined above
	app.post('/report-csp-violation', (req, res) => {
		if (req.body) {
			log.error('CSP Violation: ', req.body);
		} else {
			log.error('CSP Violation: No data received!');
		}
		res.status(204).end()
	});

	/**
	 * Prevent clickjacking attack by adding X-Frame-Options 
	 * to 'deny'. This prevents browsers from including 
	 * this webpage inside an iframe
	*/
	app.use(helmet.frameguard({ action: 'deny' }))

	//Hide X-Powered-By header
	app.use(helmet.hidePoweredBy());
	
	// Sets "X-XSS-Protection: 1; mode=block".
	app.use(helmet.xssFilter())
	
	//Add request id to each request. This will help grep the logs with the unique request id
	app.use(addRequestId());
	
	//setup logger to log all http requests to access.log
	app.use(log4js.connectLogger(log4js.getLogger("http"), { 
		level: 'auto',
		format: (req, res, format) => format(`:remote-addr - ${req.id} ${'- ||' +req.loggedInUser+'||'} - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent" - ${res.totalTime} msec`) 
	}));

	// Sets "Strict-Transport-Security: max-age=60 days; includeSubDomains".
	app.use(helmet.hsts({
		maxAge: 5_184_000 //60 days
	}));

	// Sets "X-Download-Options: noopen".
	app.use(helmet.ieNoOpen());

	// Sets "X-Content-Type-Options: nosniff".
	app.use(helmet.noSniff());
	
	//Serve static files from the React app
	app.use(express.static(path.join(__dirname, '../../../react-app/build')));
	
	//Router
	router(app);

	// The "catchall" handler: for any request that doesn't
	// match one above, send back React's index.html file.
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname+'../../../../react-app/build/index.html'));
	});

	// catch 404 and forward to error handler
	/*
	app.use((req, res, next) => {
		next(createError(404, 'This path does not exist'));
	});*/

	// Error Handling
	app.use(  (err, req, res, next) => {
		log.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
		if (res.headersSent) {
			return next(err);
		}
		if (err.name === 'UnauthorizedError') {
			res.status(401).send(err.code + " : " + err.message)
		}else{
			res.status(err.status || 500)
				.send(err.code + (err.message || " : an error occured while fulfilling the request..."));
		}
	});

	const end = process.hrtime.bigint(); //time in nanoseconds
	const timeTaken = Number((end-start)*1000000n/1000000n)/1000000; //convert to milliseconds
	log.info(`express app installed in ${timeTaken} msecs`);

    return app;
}