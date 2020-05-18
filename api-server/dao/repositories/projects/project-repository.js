import log4js from 'log4js';

import ProjectModel from '../../models/projects/project-model';
import CommonUtils from '../../../utils/common-utils';

export default class ProjectRepo {

    constructor(projectModel){
        this.log = log4js.getLogger("project-repo");
        this.model = projectModel ? projectModel : ProjectModel
    }

    async getProjects ({pageNo = 1, items = 10, userId} = {}, reqId = ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getProjects`, reqId);
        if(!userId || userId.length === 0){
            throw new Error('userId must be passed to query projects');
        }
        const skip = (pageNo-1) * items;
        let qry = {
            "$or":[
                {"project_owner":userId},
                {"project_members":{"$elemMatch": {"$eq":userId} }}
            ],
            "archived" : {"$ne":true}  
        }
        var projects = await this.model
            .find(qry)
            .sort({ created_on : -1 })
            .limit(Number(items))
            .skip(Number(skip))
            .select({_id:0}) 
            .catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${projects.length} projects`, reqId);
        return projects;
       
    }

    async addProject(project, reqId= ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in addproject`, reqId);     
        try {
            const resp = this.model
                .create(project)
                .catch(err => { throw err; });   
            CommonUtils.logFunctionExitInDebug(this.log, `returning addProject`, reqId);
            return resp;
        } catch(err) {
            if(err.code === 11000){
                let errorMessage = `Resource already exists: ${err.keyValue.project_id}`;
                throw new Error(errorMessage);
            }else{
                throw err;
            }
        }
    }

    async updateProject({
                projectId,
                projectName,
                members,
                excludedEventTypes,
                origins
            }, reqId= ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in updateProject`, reqId); 
        if(!projectId || projectId === null || projectId.length === 0){
            throw new Error('projectId must be passed to update the project');
        }
        
        const query = ProjectRepo._buildProjQueryById(projectId);
        const updateFields = ProjectRepo._buildUpdateFields({
            project_name: projectName,
            project_members: members,
            excluded_event_types: excludedEventTypes,
            origins : origins    
        });
        const resp = await ProjectRepo._updateProjectInDB(query, updateFields, this.model)
            .catch(error => { throw error; });
                
        CommonUtils.logFunctionExitInDebug(this.log, `returning updateProject`, reqId);
        return resp;
        
    }

    async archiveProject({
                projectId
            }, reqId= ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in archiveProject`, reqId); 
        if(!projectId || projectId === null || projectId.length === 0){
            throw new Error('projectId must be passed to archive the project');
        }
        
        const query = ProjectRepo._buildProjQueryById(projectId);
        const updateFields = ProjectRepo._buildUpdateFields({
            archived : true   
        });
        const resp = await ProjectRepo._updateProjectInDB(query, updateFields, this.model)
            .catch(error => { throw error; });
                
        CommonUtils.logFunctionExitInDebug(this.log, `returning archiveProject`, reqId);
        return resp;
        
    }

    async getProjectById(projectId, reqId= ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getProjectById`, reqId);     
        if(!projectId || projectId.length === 0){
            throw new Error('projectId must be passed to query projects');
        }
        const qry = {
            "project_id" : projectId,
            "archived" : {"$ne":true}  
        }
        const resp = await this.model
            .find(qry)
            .select({_id:0}) 
            .catch(err => { throw err; });  
        CommonUtils.logFunctionExitInDebug(this.log, `returning getProjectById`, reqId);
        return resp;
    }

    async saveProjects(projects, reqId = "") {
        CommonUtils.logFunctionEntryInDebug(this.log,`in saveProjects`, reqId);     
        try{
            const resp = await this.model.insertMany(projects);    
            CommonUtils.logFunctionExitInDebug(this.log, `returning saveProjects`, reqId);
            return resp;
        }catch(err){
            throw err;
        }
    }

    static _buildProjQueryById(projectId){
        if(projectId && projectId.length > 0){
            return {
                project_id : projectId
            }
        }else{
            throw new Error('Invalid projectId');
        }
    }

    static _buildUpdateFields(objFields){
        if(objFields && typeof objFields === 'object'){
            return {
                $set : objFields
            }
        }else{
            throw new Error('Invalid update fields');
        }
    }

    static async _updateProjectInDB(query, updateObj, model){
        return await model
        .findOneAndUpdate(query,updateObj, {new: true}) //new: true returns updated doc after update
        .catch(error => { throw error; });
    }
}
