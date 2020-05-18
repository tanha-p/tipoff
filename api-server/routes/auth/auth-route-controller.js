import express from 'express';
import log4js from 'log4js';
import { check, validationResult, body } from 'express-validator';

import RouteUtils from '../../utils/route-utils';
import UserSvc from '../../services/users/user-svc';

const log = log4js.getLogger("auth-route-ctrl");
const userSvc = new UserSvc();
const router = express.Router();

/* POST Login API.  
/api/v1/auth/login
{
    email: 'required',
    password: 'required'
}
*/
router.post('/login',
	[
		//validate input
        check('userId',RouteUtils.INVALID_EMAIL_ERR_MSG).isEmail(),
		check('password',RouteUtils.INVALID_PASSWORD).isLength({min: 6, max: 64})
	], 
	async (req, res) => {
		RouteUtils.logFunctionEntryInDebug(log, `in POST /login ` , req.id);
		//Check if validation resulted in Errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//return 422 - Unprocessable Entity with errors
			return RouteUtils.sendUnprocessableEntity(res,errors,log, req.id);
		}
		try{
			let resp = await userSvc.validateUser(req)
				.catch(error => { throw error; });
			if(resp && resp.validUser){
				req.loggedInUser = req.body.userId;
				return RouteUtils.sendSuccessResponse(res,resp,undefined, log, 
					`returning successful login `,req.id);
			}else{
				return RouteUtils.sendAuthorizationFailure(res,`login unsuccessful - ${req.body.userId}`,log,req.id)
			}
			
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);

router.post('/register',
	[
		//validate input
		check('userId',RouteUtils.INVALID_EMAIL_ERR_MSG).isEmail(),
		check('name',RouteUtils.INVALID_NAME).isLength({min:3}),
        check('password',RouteUtils.INVALID_PASSWORD).isLength({min: 6, max: 64}),
		check('confirmPassword', RouteUtils.INVALID_CONFIRM_PWD)
			.custom((value, { req }) => value === req.body.password)
        
	], 
	async (req, res) => {
		RouteUtils.logFunctionEntryInDebug(log, `in PUT /register ` , req.id);
		//Check if validation resulted in Errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//return 422 - Unprocessable Entity with errors
			return RouteUtils.sendUnprocessableEntity(res,errors,log, req.id);
		}
		try {	
			const resp = await userSvc.addUser(req)
				.catch(error => { throw error; });
			return RouteUtils.sendSuccessResponse(res,resp, 201,  log, 
				`returning successful user `,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);

export default router;
