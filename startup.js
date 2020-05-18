import server from './api-server/server/server';
import fs from 'fs';

/**
 * make a log directory, just in case it isn't there.
 */
try {
	fs.mkdirSync('./api-server/logs');
} catch (e) {
	if (e.code != 'EEXIST') {
		console.error("Could not set up ./api-server/logs directory, error was: ", e);
	}
}
// start server
server();

