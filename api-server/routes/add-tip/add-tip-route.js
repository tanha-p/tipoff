import express from 'express';
import log4js from 'log4js';
import { check, validationResult } from 'express-validator';

import RouteUtils from '../../utils/route-utils';
import TipsSvc from '../../services/tips/tips-svc';
import {validateOriginForProject} from '../../utils/auth-utils';

const log = log4js.getLogger("tips-route-ctrl");

const router = express.Router();
const tipsSvc = new TipsSvc();

/** 
@api {post} /api/v1/add-tip
@apiName AddTip
@apiGroup Add Tip From Browser

@apiParam {String} projectId This is the eventType that is associated with each Tip. 
@apiParam {String} eventType Tips with eventType such as success, info, error, unhandled or warning get highlighted 
with appropriate color on the View Tips page. eventType is not limited to only 
these types. Any custom eventType string is acceptable.
@apiParam {String} eventTitle The purpose of this field is to provide human 
readable, meaningful title to the event.
@apiParam {String[]} [tags] This is an array of strings and can be used to pass 
different tags to the Tip and can help combine similar Tips while searching. e.g. All events in the checkout flow can be tagged with 'checkout' tag and can later be searched using the same tag.
@apiParam {Object} [user] This can be used to pass the user object associated 
with the event. Passing user.user_id as a unique identifier is highly recommended
 when passing user object. user_id field is searchable. 
 Rest of the user object is not searchable and can be used to search all the 
 Tips triggerred by the user_id.
@apiParam {String} [note] This field can be used to pass any kind of note related 
 to the Tip that will help the analysis later on.
@apiParam {Object} [eventStack[stackTrace]] stacktrace of generated error
@apiParam {String} [screenshot] data:image (base64 encoded string) of the screenshot taken of user's browser

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
			return RouteUtils.sendSuccessResponse(res,`Tip added successfully.`, 201,  log, 
			 	`Tip added successfully.`,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
    }
);

export default router;
