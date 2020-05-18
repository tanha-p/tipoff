import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import conf from '../conf/app-config';
import RouteUtils from '../utils/route-utils';

import ProjectsSvc from '../services/projects/projects-svc';


export function getSignedToken(payload) {
    let token = jwt.sign(payload,conf.jwt_sign_secret_key,
        {expiresIn:conf.jwt_token_valid_time}); 
    return token;
}

export function protectRoute( req, res, next) {
    //reset loggedInUser
    req.loggedInUser = null;
    //check for auth header
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
        //get token
        const arr = bearerHeader.split(' ');
        const token = arr[1];
        try {
            //decode token
            var decoded = jwt.verify(token, conf.jwt_sign_secret_key);
            //set valid loggedInUser 
            req.loggedInUser = decoded.userId;
            //forward the request to actual route handler
            next();
        } catch(err) {
            return RouteUtils.sendForbidden(res,'',null,'');
        }
        
    } else {
        return RouteUtils.sendForbidden(res,'',null,'');
    }
}

export async function validateOriginForProject(req, res, next) {
    //Valdiate project ID and origin header
    const origin = req.get('origin');
    if (origin && origin.length > 0) {
        try {
            const projectId = req.body.projectId;
            if (projectId && projectId.length > 0) { 
                req.params.projectId = req.body.projectId;
                let project = await new ProjectsSvc()
                    .getProjectByProjectId(req)
                    .catch(e=>{
                        throw e;
                    });
                if (project && project.projectId === projectId) {
                    console.log(project.origins);
                    if (project.origins && project.origins.length > 0) {
                        console.log(project.origins)
                        if (project.origins.includes(origin)) {
                            res.header('Access-Control-Allow-Origin', origin);
                            next(); //found matching origin
                        } else {
                            throw new Error(`${origin} is not one of the allowed origins to send request`);
                        }
                    } else {
                        next(); //origins are not setup.. all domains are allowed
                    }
                } else {
                    throw new Error(`There is no project associated with projectId: ${projectId}`);
                }
            } else {
                throw new Error('Valid projectId is required');
            }
            
        } catch(error) {
            return RouteUtils.sendFailureResponse(res, error, undefined, null, req.id);
        }
    } else {
        next(); //origin header was not found. Request is not cross-domain
    }
}

export async function encryptString(str) {
    return await bcrypt.hash(str, 10).catch(error => { throw error; });
}

export async function validateEncryptedString(str, encryptedStr) {
    return await bcrypt.compare(str,encryptedStr)
}

export function getLoggedInUserFromReq(req){
    return req ? req.loggedInUser : null;
}


export default {
    getSignedToken,
    protectRoute, 
    encryptString, 
    validateEncryptedString,
    getLoggedInUserFromReq
}