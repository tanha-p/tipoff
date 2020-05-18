import sendGridAddTipNotifier from './email/sendgrid-add-tip-notifier';
import slackAddTipNotifier from './messaging/slack-add-tip-notifier';

export const addTipNotifiers = () => {
    const notifiers = [
        {
            name : 'Email(SendGrid)',
            type : 'email',
            handler : sendGridAddTipNotifier
        }
        // ,{
        //     name : 'Slack',
        //     type : 'messaging',
        //     handler : slackAddTipNotifier
        // }
    ]
    return notifiers;
}