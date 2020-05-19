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
        let msg = `${requestId} - ${data}`;
        if(log && log.isInfoEnabled()){
            log.info(msg);
        }
    }

    static logDebug(log,data,requestId = "reqidnotfound"){
        let msg = `${requestId} - ${data}`;
        if(log && log.isDebugEnabled()){
            log.debug(msg);
        }
    }

    static logError(log,error,requestId = "reqidnotfound"){
        let msg = error ? `${requestId} - ${error.message}` : '';
        if(log){
            log.error(msg,error);
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