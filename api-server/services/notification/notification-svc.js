import log4js from 'log4js';

import CommonUtils from '../../utils/common-utils';
import {addTipNotifiers} from '../../notifiers';

export default class NotificationSvc {

    constructor () {
        this.log = log4js.getLogger("notification-svc");
    }

    notifyAddTip(tip,reqid = "") {
        CommonUtils.logFunctionEntryInDebug(this.log,`in notify`, reqid);
        const notifiers = addTipNotifiers();
        const notifierSuccess = [];
        for (const notifier of notifiers) {
            try{
                const notified = notifier.handler(tip);
                notified && notifierSuccess.push(notifier.name);
            }catch(e){
                CommonUtils.logError(e,reqid);
            }
        }
        CommonUtils.logFunctionExitInDebug(this.log, `returning from notify`, reqid);
        return notifierSuccess;
    }

}