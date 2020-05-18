import log4js from 'log4js';
import TipModel from '../../models/tip/tip-model';
import CommonUtils from '../../../utils/common-utils';

export default class TipsRepo  {

    constructor(tipModel){
        this.log = log4js.getLogger("tips-repo");
        this.tipModel = tipModel ? tipModel : TipModel;
    }

    async getTips ({pageNo = 1, items = 10, projectId, searchTerm=''} = {}, reqId = ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getTips`, reqId);
        if(!projectId || projectId.length === 0) {
            throw new Error('valid projectId is required to get the tips.');
        }
        const skip = (pageNo-1) * items;
        let qry = {
            project_id : projectId
        };
        if(searchTerm && searchTerm.length>0){
            qry.$text = { $search : searchTerm }
        }
        var tips = await this.tipModel
            .find(qry)
            .sort({ created_on : -1 })
            .limit(Number(items))
            .skip(Number(skip))
            .select({_id:0, __v:0, event_stack:0, 'user._id':0}) //TODO fix the user._id projection
            .catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${tips.length} tips`, reqId);
        return tips;
       
    }

    async getTipById (tipId, reqId = ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getTips`, reqId);
        if(!tipId || tipId.length === 0) {
            throw new Error('valid tipId is required.');
        }
        let qry = {
            tip_id : tipId
        };
        var tips = await this.tipModel
            .find(qry)
            .select({_id:0, __v:0, 'user._id':0}) //TODO fix the user._id projection
            .catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${tips.length} tips`, reqId);
        return tips;
    }

    async saveTips(tips, reqId = ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in saveTips`, reqId);     
        
        //Add cuid as tip_id before inserting any documents
        tips = tips.map(tip => {
            tip.tip_id = tip.tip_id ? tip.tip_id : CommonUtils.getCuid();
            return tip;
        });

        const resp = await this.tipModel.insertMany(tips).catch(error => { throw error; });   
        CommonUtils.logFunctionExitInDebug(this.log, `returning from saveTips`, reqId);

        return resp;
         
    }

    async addTip(tip, reqId = "") {
        CommonUtils.logFunctionEntryInDebug(this.log,`in addTip`, reqId);     
        const resp = await this.tipModel.create(tip).catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning from addTip`, reqId);
        return resp;
    }

    async updateTipNotifiers(tipId, notifiers, reqId = "") {
        CommonUtils.logFunctionEntryInDebug(this.log,`in updateTipNotifiers`, reqId);     
        const notifierObj = {
            notifiers : notifiers
        }
        const resp = await this._updateTipById(tipId, notifierObj, reqId).catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning from updateTipNotifiers`, reqId);
        return resp;
    }

    async _updateTipById(tipId, updateObj, reqId = "") {
        CommonUtils.logFunctionEntryInDebug(this.log,`in updateTip`, reqId); 
        const query = {
            tip_id : tipId
        }
        const resp = await this.tipModel
            .findOneAndUpdate(query,updateObj, {new: true}) //new: true returns updated doc after update
            .catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning from updateTipNotifiers`, reqId);
        return resp;
    }

}
