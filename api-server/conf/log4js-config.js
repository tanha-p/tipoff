/* istanbul ignore file */

import path from 'path';

const getConfig = () => {
	if(process.env.NODE_ENV === 'development') {
		return {
			"appenders": {
				"console": { 
					"type": 'console' 
				},
				"access": {
					"type": "dateFile",
					"filename": path.join(__dirname,"../logs/access.log"),
					"pattern": "-yyyy-MM-dd.log",
					"category": "http"
				},
				"app": {
					"type": "file",
					"filename": path.join(__dirname,"../logs/app.log"),
					"maxLogSize": 10485760,
					"numBackups": 3
				},
				"errorFile": {
					"type": "file",
					"filename": path.join(__dirname,"../logs/errors.log")
				},
				"errors": {
					"type": "logLevelFilter",
					"level": "ERROR",
					"appender": "errorFile"
				}
			},
			"categories": {
				"default": { 
					"enableCallStack":true,
					"appenders": [ "console", "app", "errors" ], 
					"level": "DEBUG" 
				},
				"http": { 
					"appenders": [ "access"], 
					"level": "DEBUG" 
				}
			}
		}
	}else if(process.env.NODE_ENV === 'testing') {
		return {
			"appenders": {
				"errorFile": {
					"type": "file",
					"filename": path.join(__dirname,"../logs/testing-errors.log")
				},
				"errors": {
					"type": "logLevelFilter",
					"level": "DEBUG",
					"appender": "errorFile",
					"maxLogSize": 1024,
					"numBackups": 2
				}
			},
			"categories": {
				"default": { 
					"enableCallStack":true,
					"appenders": [ "errors"], 
					"level": "DEBUG" 
				}
			}
		}
	}
	else {
		return {
			"appenders": {
				"access": {
					"type": "dateFile",
					"filename": path.join(__dirname,"../logs/access.log"),
					"pattern": "-yyyy-MM-dd",
					"category": "http"
				},
				"app": {
					"type": "file",
					"filename": path.join(__dirname,"../logs/app.log"),
					"maxLogSize": 10485760,
					"numBackups": 3
				},
				"errorFile": {
					"type": "file",
					"filename": path.join(__dirname,"../logs/errors.log")
				},
				"errors": {
					"type": "logLevelFilter",
					"level": "ERROR",
			"appender": "errorFile"
				}
			},
			"categories": {
				"default": { 
					"enableCallStack":true,
					"appenders": [ "app", "errors" ], 
					"level": "INFO" 
				},
				"http": { 
					"appenders": [ "access"], 
					"level": "INFO" 
				}
			}
		}
	}

	
}
export default getConfig();

