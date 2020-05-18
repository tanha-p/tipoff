'use strict'

import log4js from 'log4js';

import loaders from './loaders';
import conf from'../conf/app-config.js';
import log4jsConfig from'../conf/log4js-config.js';

log4js.configure(log4jsConfig);

const log = log4js.getLogger("server");

const server = async () => {
	
	log.info('Starting server...'); 
	const start = process.hrtime.bigint(); //time in nanoseconds

	var app = await loaders();

	app.listen(conf.port , err => {
		if (err) {
			console.log(err);
			return;
		}
		const end = process.hrtime.bigint(); //time in nanoseconds
		const timeTaken = Number((end-start)*1_000_000n/1_000_000n)/1_000_000; //convert to milliseconds
		log.info(`server started at port ${conf.port} in total ${timeTaken} msecs`);
	});

	return app

}

export default server;
