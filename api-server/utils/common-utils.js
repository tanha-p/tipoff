import cuid from 'cuid';
import parser from 'ua-parser-js';

export default class CommonUtils {
    static logFunctionEntryInDebug = (log,message,requestId = "reqidnotfound") => {
        if(log && log.isDebugEnabled()){
            log.debug(`${requestId} - ${message}`);
        }
    }
    static logFunctionExitInDebug = (log,message,requestId = "reqidnotfound") => {
        if(log && log.isDebugEnabled()){
            log.debug(`${requestId} - ${message} - EXIT`);
        }
    }

    static logInfo(log,data,requestId = "reqidnotfound"){
        if(log && log.isInfoEnabled()){
            log.info(data);
        }
    }

    static logDebug(log,data,requestId = "reqidnotfound"){
        if(log && log.isDebugEnabled()){
            log.debug(data);
        }
    }

    static logError(log,error,requestId = "reqidnotfound"){
        if(log){
            log.error(error ? error.message : '',error);
        }
    }

    static getCuid(){
        return cuid();
    }

    static getUserAgentFromReq(req) {
        return parser(req.headers['user-agent']);
    }

    static getHostFromReq(req) {
        return req.get('host');
    }

}