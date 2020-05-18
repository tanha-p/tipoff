import log4js from 'log4js';
import CommonUtils from '../../utils/common-utils';
import config from '../../conf/app-config';
import getAddTipEmailBody from './templates/add-tip-template';
import sgMail from'@sendgrid/mail';
sgMail.setApiKey(config.sendgrid_api_key);

export default async function sendGridAddTipNotifier(tip){
    const log = log4js.getLogger("sandgrid-notifier");
    CommonUtils.logFunctionEntryInDebug(log,`in emailNotifier`, "");
    let emailSent = false;
    let to = [];
    for(const member of tip.project.members) {
        if(member.indexOf('tipoff.dev') < 0) {
            to.push({email: member, name:'Tipoff User' })
        }
    }
    if(to.length > 0) {
        const msg = {
            to: to,
            from: {
                email:config.sendgrid_from_email,
                name:'Tipoff Notifier'
            },
            subject: `${tip.event_type} Tip received for ${tip.project.project_name}`,
            text: 'tipoff test',
            html: getAddTipEmailBody(tip),
        };
        try{
            await sgMail
                .send(msg)
                .catch(e => {
                    console.log(e)
                    throw e;
                });
            emailSent = true;
        }catch(e){
            CommonUtils.logError(log,e,);
        }
    }
    CommonUtils.logFunctionExitInDebug(this.log, `email sent for tip ${tip.tip_id}`);
    return emailSent;
}