import log4js from 'log4js';
import CommonUtils from '../../utils/common-utils';

export default function slackAddTipNotifier(tip){
    const log = log4js.getLogger("slack-notifier");
    CommonUtils.logFunctionEntryInDebug(log,`in slack notifier`, "");
    console.log(`message sent for tip: ${tip.tip_id}`);
    return true;
}