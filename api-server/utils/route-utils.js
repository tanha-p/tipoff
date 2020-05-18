import { response } from "express";
import CommonUtils from "./common-utils";

export default class RouteUtils extends CommonUtils {
    //ERROR MESSAGES
    static INVALID_PAGE_NO_ERR_MSG = `must be an integer greater than 1, max 100. defaults to 1 if omitted`;
    static INVALID_ITEMS_ERR_MSG = `must be an integer greater than 1, max 1000. defaults to 10 if omitted`;
    static INVALID_EMAIL_ERR_MSG = `is not a valid email`;
    static INVALID_PASSWORD = `must be between 6 and 64 characters`;
    static INVALID_NAME = `must be min 3 characters`;
    static INVALID_PROJECT_NAME = `is required and must be max 130 characters`;
    static INVALID_CONFIRM_PWD = `must match the password`;
    static REQUIRED_PASSWORD = `is required`;
    static EMPTY_STRING_NOT_ALLOWED = `must not be empty`;
    static INVALID_ORIGIN = `must be a valid origin. e.g. http://localhost:3001 or https://sub.mysite.com or http://www.mysite.com`;
    static INVALID_EVENT_TYPE = `is required and must be a string between 1 and 50 characters long`;
    static INVALID_EVENT_TITLE = `is required and must be a string between 1 and 1000 characters long`;
    static USERID_REQUIRED = `user object is missing required 'userId' property`;



    //Send success response and log it
    static sendSuccessResponse = (res,data,code = 200,log,message,requestID) => {
        RouteUtils.logFunctionExitInDebug(log,message,requestID);
        return res.status(code).json({
            success: true,
            data: data
        });
    }
    static sendFailureResponse = (res, err, errorCode = 500, log, requestID) => {
        
        let errorMessage = err && err.message ? err.message : `Something went wrong while trying to fulfill your request`;
        
        if(err.message.indexOf('Resource already exists') > -1){
            errorCode = 409;
            RouteUtils.logInfo(log, errorMessage, requestID)
        }else{
            RouteUtils.logError(log, err, requestID);
        }
        return res.status(errorCode).json({
            success:false,
            data: {
                err:errorMessage
            }
        });
    }
    static sendAuthorizationFailure = (res,data,log,requestID) => {
        RouteUtils.logInfo(log, data, requestID);
        return res.status(401).json({
            success:false,
            data: {
                err:'User is not authorized'
            }
        });
    }

    static sendForbidden = (res,data,log,requestID) => {
        RouteUtils.logInfo(log, data, requestID);
        return res.status(403).json({
            success:false,
            data: {
                err:'Auth token is either expired or invalid'
            }
        });
    }
    
    static sendUnprocessableEntity = (res, errors, log, requestID) => {
        RouteUtils.logFunctionExitInDebug(log,`returning unprocessable entiry`,requestID);
        return res.status(422).json({ 
            success:false,
            data: {
                err:errors.array()
            }
        });
    }
}