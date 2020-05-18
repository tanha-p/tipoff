import log4js from 'log4js';

import TipsRepo from '../../dao/repositories/tips/tips-repository';
import ProjectSvc from '../../services/projects/projects-svc';
import NotificaitonSvc from '../../services/notification/notification-svc';
import CommonUtils from '../../utils/common-utils';
import {getLoggedInUserFromReq} from '../../utils/auth-utils';
import {formatTip, createTipFromReq} from '../../utils/service-utils';


export default class TipSvc  {
    constructor(repo, projectSvc, notificationSvc){
        this.log = log4js.getLogger("tips-svc");
        this.tipsRepo = repo ? repo : new TipsRepo();
        this.projectSvc = projectSvc ? projectSvc : new ProjectSvc();
        this.notificationSvc = notificationSvc ? notificationSvc : new NotificaitonSvc();
    }

    async getTips (req){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getTips`, req.id);
        let isAuthorized =  await this._isUserAuthorizedToViewTips(req.query.projectId, req).catch(error => {
            throw error;
        });           
        if(!isAuthorized){
            throw new Error('unauthorized');
        }
        let tips = await this.tipsRepo
            .getTips(req.query, req.id)
            .catch(error => {
                throw error;
            });
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${tips.length} tips`, req.id);
        return tips;
    }

    async getTipById (req){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getTipById`, req.id);
        const tipId = req.params.tipId;
        let tips = await this.tipsRepo
            .getTipById(tipId, req.id)
            .catch(error => {
                throw error;
            });
        let tip = {};
        if(tips && tips[0]){
            tip = tips[0];
        }
        //check if user is authorized to view tip based on projectId
        let isAuthorized = await this._isUserAuthorizedToViewTips(tip.project_id, req).catch(error => {
            throw error;
        });
        if(!isAuthorized){
            throw new Error('unauthorized');
        }
        //populate project name
        let project = await this._getProject(tip.project_id,req).catch(error => {
            throw error;
        });
        tip = formatTip(tip,tipId, project.projectName);
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${tip.tip_id} tip`, req.id);
        return tip;
    }

    async _isUserAuthorizedToViewTips(projectId, req){
        CommonUtils.logFunctionEntryInDebug(this.log,`in _isUserAuthorizedToViewTips`, req.id);
        let authorized = false;
        const userId = getLoggedInUserFromReq(req);
        const project =  await this._getProject(projectId,req).catch(error => {
            throw error;
        });
        if(project.projectOwner === userId){
            authorized = true;
        }else{
            for(let i = 0 ; i < project.members ; i++){
                if(project.members[i] === userId){
                    authorized = true;
                    break;
                }
            }
        }
        CommonUtils.logFunctionExitInDebug(this.log, `returning authorized - ${authorized}`, req.id);
        return authorized;
    }

    async _getProject(projectId, req){
        CommonUtils.logFunctionEntryInDebug(this.log,`in _getProject`, req.id);
        req.params = req.params ? req.params : {};
        req.params.projectId = projectId ;
        let project = await this.projectSvc.getProjectByProjectId(req).catch(error => {
            throw error;
        });
        CommonUtils.logFunctionExitInDebug(this.log, `returning project - ${projectId}`, req.id);
        return project;
    }

    async addTip(req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in addTip`, req.id);
        try{
            let tip = createTipFromReq(req);
            let tipDB = await this.tipsRepo.addTip(tip, req.id).catch(e=>{
                throw e;
            });
            await this.notifyAddTip(tipDB, req);
            CommonUtils.logFunctionExitInDebug(this.log, `returning from addTip, tipId: ${tipDB.tip_id}`, req.id);
            return tipDB;
        } catch(e) {
            CommonUtils.logError(this.log,e,req.id);
        }
    }

    async notifyAddTip(tip, req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in notifyAddTip`, req.id);
        //Check if the event type needs to be notified
        req.params.projectId = tip.project_id;
        let project = await this.projectSvc.getProjectByProjectId(req);
        if(project && project.projectId === tip.project_id) {
            //check if the event type is not part of the excludedEventTypes
            if(project.excludedEventTypes 
                    && project.excludedEventTypes.includes(tip.event_type) === true) {
                CommonUtils.logDebug(this.log,`${tip.event_type} is excluded for project ${project.projectName}`)
            } else {
                //send notifications
                let members = project.members;
                members.push(project.projectOwner);
                tip.project = {
                    project_name : project.projectName,
                    members : members
                }
                tip.tip_url = `${req.protocol}://${CommonUtils.getHostFromReq(req)}/tip/${tip.tip_id}`;
                let notifiers = this.notificationSvc.notifyAddTip(tip, req.id);
                console.log(notifiers);
                await this.updateTipNotifiers(tip.tip_id, notifiers, req).catch(e=>{throw e});
            }
        }
        CommonUtils.logFunctionExitInDebug(this.log, `returning from notifyAddTip, tipId: ${tip.tip_id}`, req.id);
    }

    async updateTipNotifiers(tipId, notifiers, req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in updateTipNotifiers`, req.id);
        await this.tipsRepo.updateTipNotifiers(tipId, notifiers, req.id).catch(e => {throw e})
        CommonUtils.logFunctionExitInDebug(this.log, `returning from updateTipNotifiers, tipId: ${tipId}`, req.id);
    }
}

