import log4js from 'log4js';

import ProjectsRepo from '../../dao/repositories/projects/project-repository';
import CommonUtils from '../../utils/common-utils.js';
import {getLoggedInUserFromReq} from '../../utils/auth-utils';
import {formatProjects, createProjectFromReq} from '../../utils/service-utils';

export default class ProjectsSvc {
    constructor(repo){
        this.log = log4js.getLogger("projects-svc");
        if(repo){
            this.projectsRepo = repo;
        }else{
            this.projectsRepo = new ProjectsRepo();
        }
    }
    async getProjects (req){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getProjects`, req.id);
        const loggedInUser = getLoggedInUserFromReq(req);
		let query = {
			page: req.query.page,
			items: req.query.items,
			userId : loggedInUser
		};
        let projects = await this.projectsRepo
            .getProjects(query, req.id)
            .catch(error => { throw error; });
        
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${projects.length} projects`, req.id);
        return formatProjects(projects, loggedInUser);
    }

    async addProject(req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in addProject`, req.id);
        const project = createProjectFromReq(req);
		const projectFromDB = await this.projectsRepo
            .addProject(project, req.id)
            .catch(error => {
				throw error;
			});
		
        const resp = {};
        resp.projectId = projectFromDB.project_id;
        CommonUtils.logFunctionExitInDebug(this.log, `returning addProject`, req.id);
        return resp;
    }

    async updateProject(req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in updateProject`, req.id);
        /**
         * TODO check if the logged in user is owner
         */
        const {projectId} = req.params;
        const {projectName, members, excludedEventTypes, origins} = req.body;
        const projectFromDB = await this.projectsRepo
            .updateProject({
                projectId,
                projectName, 
                members, 
                excludedEventTypes,
                origins
            }, req.id)
            .catch(error => {
				throw error;
			});
        const resp = {
            projectId: projectFromDB.project_id, 
            projectName: projectFromDB.project_name, 
            members: projectFromDB.project_members, 
            excludedEventTypes: projectFromDB.excluded_event_types,
            origins: projectFromDB.origins
        };
        CommonUtils.logFunctionExitInDebug(this.log, `returning updateProject`, req.id);
        return resp;
    }

    async deleteProject(req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in deleteProject`, req.id);
        /**
         * TODO check if the logged in user is owner
         */
        const {projectId} = req.params;
        const projectFromDB = await this.projectsRepo
            .archiveProject({
                projectId
            }, req.id)
            .catch(error => {
				throw error;
			});
        const resp = `${projectFromDB.project_id} deleted successfully`;
        CommonUtils.logFunctionExitInDebug(this.log, `returning deleteProject`, req.id);
        return resp;
    }

    async getProjectByProjectId(req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in getProjectByProjectId`, req.id);
        /**
         * TODO check if the logged in user is owner
         */
        const respDB = await this.projectsRepo
            .getProjectById(req.params.projectId, req.id)
            .catch(error => {
				throw error;
			});
		
        let resp = null;
        if(respDB && respDB.length > 0){
            resp = formatProjects(
                respDB, 
                getLoggedInUserFromReq(req)
            )[0];
        }
        CommonUtils.logFunctionExitInDebug(this.log, `returning getProjectByProjectId`, req.id);
        return resp;
    }
}



