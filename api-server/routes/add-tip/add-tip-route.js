import express from 'express';
import log4js from 'log4js';
import { check, validationResult } from 'express-validator';

import RouteUtils from '../../utils/route-utils';
import TipsSvc from '../../services/tips/tips-svc';
import {validateOriginForProject} from '../../utils/auth-utils';

const log = log4js.getLogger("tips-route-ctrl");

const router = express.Router();
const tipsSvc = new TipsSvc();

/* GET Tips API.  
/api/v1/tips(?pageNo=&items=)
*/
router.post('/',
    validateOriginForProject, //middleware to validate if origin is allowed to send request
    [
		//validate input
        check('projectId').exists(),
        check('eventType', ).isLength({min:1,max:50}).custom(eventType => {
            if(!eventType || 
                    typeof eventType !== 'string' || 
                    eventType.length === 0 ||
                    eventType.length > 1000){
                throw new Error(RouteUtils.INVALID_EVENT_TYPE);
            }
            return true;
        }),
        check('eventTitle').exists().custom(title => {
            if(!title || 
                    typeof title !== 'string' || 
                    title.length === 0 ||
                    title.length > 1000){
                throw new Error(`is required and must be a valid String between 1 and 1000 characters.`);
            }
            return true;
        })
	],
    async (req, res, next) => {
        RouteUtils.logFunctionEntryInDebug(log, `in POST / ` , req.id);
		//Check if validation resulted in Errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//return 422 - Unprocessable Entity with errors
			return RouteUtils.sendUnprocessableEntity(res,errors,log, req.id);
		}
		try {
            /**
             * As soon as the tip is sent to the service layer, the response 
             * will be returned back to the browser. The end user doesn't care 
             * or need to wait till the Tip is added to db and all 
             * notifications are sent.
             */ 	
			tipsSvc.addTip(req);
			// 	.catch(error => { throw error; });
			return RouteUtils.sendSuccessResponse(res,`Tip added successfully.`, 201,  log, 
			 	`Tip added successfully.`,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
    }
);

export default router;
