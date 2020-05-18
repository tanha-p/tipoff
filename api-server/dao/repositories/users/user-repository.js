import log4js from 'log4js';
import UserModel from '../../models/user/user-model';
import CommonUtils from '../../../utils/common-utils';

export default class UserRepo  {

    constructor(userModel){
        this.log = log4js.getLogger("user-repo");
        this.userModel= userModel ? userModel : UserModel;
    }

    async getUsers ({pageNo = 1, items = 10} = {}, reqId = ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getUsers`, reqId);
        const skip = (pageNo-1) * items;
        let qry = {};
        var users = await this.userModel
            .find(qry)
            .sort({ created_on : -1 })
            .limit(Number(items))
            .skip(Number(skip))
            .select({_id:0}) 
            .catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${users.length} users`, reqId);
        return users;
       
    }

    async getUserByUserId (userId, reqId = ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in getUser`, reqId);
        let qry = {
            user_id: userId
        };
        var user = await this.userModel
            .find(qry)
            .select({_id:0}) 
            .catch(error => { throw error; });
        CommonUtils.logFunctionExitInDebug(this.log, `returning ${userId}`, reqId);
        return user;
    }

    async addUser (user, reqId = ""){
        CommonUtils.logFunctionEntryInDebug(this.log,`in addUser`, reqId);     
        try{
            const resp = await this.userModel
                .create(user)
                .catch(err => { throw err; });    
            CommonUtils.logFunctionExitInDebug(this.log, `returning addUser`, reqId);
            return resp;
        }catch(err){
            if(err.code === 11000){
                let errorMessage = `Resource already exists: ${err.keyValue.user_id}`;
                throw new Error(errorMessage);
            }else{
                throw err;
            }
        }
    }
}
