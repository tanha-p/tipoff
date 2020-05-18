import express from 'express';
import log4js from 'log4js';
import { check, validationResult } from 'express-validator';

import RouteUtils from '../../utils/route-utils';
import ProjectSvc from '../../services/projects/projects-svc';

const log = log4js.getLogger("projects-route-ctrl");

const router = express.Router();
const projectSvc = new ProjectSvc();

/* GET Projects API.  
/api/v1/projects(?pageNo=&items=)
*/
router.get('/',
	[
		//validate input
		check('pageNo').optional().isInt({min:1,max:100}).withMessage(RouteUtils.INVALID_PAGE_NO_ERR_MSG),
		check('items').optional().isInt({min:1, max:1000}).withMessage(RouteUtils.INVALID_ITEMS_ERR_MSG)
	], 
	async (req, res) => {
		RouteUtils.logFunctionEntryInDebug(log, `in GET / qry:${JSON.stringify(req.query)}` , req.id);
		//Check if validation resulted in Errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//return 422 - Unprocessable Entity with errors
			return RouteUtils.sendUnprocessableEntity(res,errors,log, req.id);
		}
		try{	
			let projects =  await projectSvc.getProjects(req).catch(error => {
				throw error;
			});
			return RouteUtils.sendSuccessResponse(res,projects, undefined, log, 
				`returning ${projects.length} projects `,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);

/* POST Projects API. (Create project) 
/api/v1/projects
{
	projectName,
	members,
	eventTypes
}
*/

router.post('/',
	[
		//validate input
		check('projectName',RouteUtils.INVALID_PROJECT_NAME).isLength({min:1,max:130}),
		check('members[*]',RouteUtils.INVALID_EMAIL_ERR_MSG).isEmail(),
		check('excludedEventTypes[*]',RouteUtils.EMPTY_STRING_NOT_ALLOWED).isLength({min:1}),
		check('origins[*]',RouteUtils.INVALID_ORIGIN).isURL({
			require_protocol:true, //either http or https must be included
			require_tld: false //This will allow http://localhost:3000 type of origins
		})
        
	], 
	async (req, res) => {
		RouteUtils.logFunctionEntryInDebug(log, `in POST /project ` , req.id);
		//Check if validation resulted in Errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//return 422 - Unprocessable Entity with errors
			return RouteUtils.sendUnprocessableEntity(res,errors,log, req.id);
		}
		try {	
			const resp = await projectSvc.addProject(req)
				.catch(error => { throw error; });
			return RouteUtils.sendSuccessResponse(res,resp, 201,  log, 
			 	`added project successfully `,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);

/* GET Project By Id API.  
/api/v1/projects/:projectId
*/
router.get('/:projectId',
	async (req, res) => {
		RouteUtils.logFunctionEntryInDebug(log, `in GET /:projectId qry:${JSON.stringify(req.query)}` , req.id);
		try{	
			let project =  await projectSvc.getProjectByProjectId (req).catch(error => {
				throw error;
			});
			return RouteUtils.sendSuccessResponse(res,project, undefined, log, 
				`returning project `,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);

/* POST Project (update project) API.  
/api/v1/projects/:projectId
{
	projectName,
	members,
	eventTypes
}
*/
router.post('/:projectId',
	[
		//validate input
		check('projectName',RouteUtils.INVALID_PROJECT_NAME).isLength({min:1,max:130}),
		check('members[*]',RouteUtils.INVALID_EMAIL_ERR_MSG).isEmail(),
		check('excludedEventTypes[*]',RouteUtils.EMPTY_STRING_NOT_ALLOWED).isLength({min:1}),
		check('origins[*]',RouteUtils.INVALID_ORIGIN).isURL({
			require_protocol:true, //either http or https must be included
			require_tld: false //This will allow http://localhost:3000 type of origins
		})
	], 
	async (req, res) => {
		RouteUtils.logFunctionEntryInDebug(log, `in POST /:projectId ` , req.id);
		//Check if validation resulted in Errors
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//return 422 - Unprocessable Entity with errors
			return RouteUtils.sendUnprocessableEntity(res,errors,log, req.id);
		}
		try {	
			const resp = await projectSvc.updateProject(req)
				.catch(error => { throw error; });
			return RouteUtils.sendSuccessResponse(res,resp, 200,  log, 
			 	`updated project ${req.params.projectId} successfully `,req.id);
		} catch(error) {
			return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
		}
	}
);

/* DELETE Project (delete project) API.  
/api/v1/projects/:projectId
*/
router.delete('/:projectId', async (req, res) => {
	RouteUtils.logFunctionEntryInDebug(log, `in Delete /project ` , req.id);
	try {	
		const resp = await projectSvc.deleteProject(req)
			.catch(error => { throw error; });
		return RouteUtils.sendSuccessResponse(res,resp, 200,  log, 
			`deleted project ${req.params.projectId} successfully `,req.id);
	} catch(error) {
		return RouteUtils.sendFailureResponse(res, error, undefined, log, req.id);
	}
});

export default router;
