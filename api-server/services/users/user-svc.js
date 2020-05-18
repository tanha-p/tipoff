import log4js from 'log4js';

import UserRepo from '../../dao/repositories/users/user-repository';
import CommonUtils from '../../utils/common-utils.js';
import {getSignedToken, encryptString, validateEncryptedString} from '../../utils/auth-utils';

export default class UserSvc  {
    constructor(repo){
        this.log = log4js.getLogger("user-svc");
        if(repo){
            this.userRepo = repo
        }else{
            this.userRepo = new UserRepo();
        }
    }
    async addUser (req){
        CommonUtils.logFunctionEntryInDebug(this.log,`in addUser`, req.id);
        let user = await this._createUserFromReq(req)
            .catch(error => {
                throw error;
            });
        const userFromDB = await this.userRepo
            .addUser(user, req.id)
            .catch(error => {
                throw error;
            });
        const resp = {};
        resp.validUser = true;
        resp.user = {'name': userFromDB.name}
        resp.token = getSignedToken({userId: userFromDB.user_id});
        
        CommonUtils.logFunctionExitInDebug(this.log, `returning addUser`, req.id);
        return resp;
    }

    async _createUserFromReq(req){
        const  {userId,password,name} = req.body;
        let hash = await encryptString(password).catch(error => { throw error; });
        let user = {
            user_id : userId,
            password: hash,
            name: name
        }
        return user;
    }

    async validateUser(req) {
        CommonUtils.logFunctionEntryInDebug(this.log,`in validateUser`, req.id);
        let resp = {
            validUser: false,
            token: undefined
        }

        let users = await this.userRepo.getUserByUserId(req.body.userId, req.id)
            .catch(error => { throw error; });
        if(users && users.length){
            const isValidPassword = await validateEncryptedString(req.body.password, users[0].password)
                .catch(error => { throw error; });
            if(isValidPassword){
                resp.validUser = true;
                resp.user = {'name': users[0].name}
                resp.token = getSignedToken({userId: users[0].user_id})
            }
        }
        
        return resp;
    }
}
