import express from 'express';
import log4js from 'log4js';
import { check, validationResult } from 'express-validator';

import RouteUtils from '../../utils/route-utils';
import TipsSvc from '../../services/tips/tips-svc.js';

const log = log4js.getLogger("tips-route-ctrl");

const router = express.Router();
const tipsSvc = new TipsSvc();

/* GET Tips API.  
/api/v1/tips(?pageNo=&items=)
*/
router.get('/',
	[
		//validate input
		check('projectId').exists(),
		check('pageNo').optional().isInt({min:1,max:100}).withMessage(RouteUtils.INVALID_PAGE_NO_ERR_MSG),
		check('items').optional().isInt({min:1, max:1000}).withMessage(RouteUtils.INVALID_ITEMS_ERR_MSG)
	], 
	async (req, res, next) => {
		RouteUtils.logFunctionEntryInDebug(log, `in GET / qry:${JSON.stringify(req.query)}` , req.id);
		console.log('inside gettips')
		//Check if validation resulted in Errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//return 422 - Unprocessable Entity with errors
			return RouteUtils.sendUnprocessableEntity(res,errors,log, req.id);
		}
		try{	
			let tips =  await tipsSvc.getTips(req).catch(error => {
				throw error;
			});
			return RouteUtils.sendSuccessResponse(res,tips, undefined, log, 
				`returning ${tips.length} tips `,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);


/* GET Tip by Id API.  
/api/v1/tips/:tipId
*/
router.get('/:tipId', async (req, res, next) => {
		RouteUtils.logFunctionEntryInDebug(log, `in GET /:tipId ${req.params.tipId}` , req.id);
		try{	
			let tip =  await tipsSvc.getTipById(req).catch(error => {
				throw error;
			});
			return RouteUtils.sendSuccessResponse(res,tip, undefined, log, 
				`returning tip ${tip.tip_id} `,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);

export default router;
