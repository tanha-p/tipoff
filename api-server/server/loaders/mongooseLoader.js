import log4js from 'log4js';
var log = log4js.getLogger("mongooseLoader");
import mongoose from 'mongoose';
import conf from '../../conf/app-config';

export default async() => {
    const start = process.hrtime.bigint(); //time in nanoseconds
	try{ 
		//Connect to mongodb using mongoose
		log.info('connecting to db...') ; 
		await mongoose.connect(conf.mongo_uri, { 
			useNewUrlParser: true, 
			useUnifiedTopology: true,
			useFindAndModify : false,
			useCreateIndex : true
		});
		const endDB = process.hrtime.bigint(); //time in nanoseconds
		const timeTakenDB = Number((endDB-start)*1_000_000n/1_000_000n)/1_000_000; //convert to milliseconds
		log.info(`db connection made in ${timeTakenDB} msecs to db ${mongoose.connection.db.databaseName}`);
	}catch(error) {
		log.error(error);
	}
}

