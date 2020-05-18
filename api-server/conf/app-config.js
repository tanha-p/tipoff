/* istanbul ignore file */
import dotenv from 'dotenv'
if(dotenv){
   dotenv.config();
}

const getConfig = () => {  
    //Common properties between all environments go inside commonProps here..
    const commonProps = {
        'mongo_uri': process.env.MONGODB_URI,
        'port': process.env.PORT || process.env.TIPOFF_API_PORT,
        'jwt_token_valid_time': '8h',
        'jwt_sign_secret_key': process.env.JWT_SECRET_KEY,
        'sendgrid_api_key': process.env.NOTIFIER_API_KEY_SENDGRID,
        'sendgrid_from_email': process.env.NOTIFIER_FROM_EMAIL_SENDGRID
    };
    /**
     * Prperties that need to be over-ridden or specified only for particular
     * environment go in individual environment specific var
     */
    const devProps = {
        'environment': 'development'
    };

    const testingProps = {
        'mongo_uri': process.env.MONGODB_URI_TEST,
        'environment': 'testing'
    };

    const stagingProps = {
        'environment': 'staging'
    };

    const prodProps = {
        'environment': 'production'
    };

    switch (process.env.NODE_ENV) {
        case 'development':
            return Object.assign(commonProps, devProps);
        case 'testing':
            return Object.assign(commonProps,testingProps);
        case 'staging':
            return Object.assign(commonProps, stagingProps);
        case 'production':
            return Object.assign(commonProps, prodProps);
        default:
            //return dev props by default
            return Object.assign(commonProps, devProps); 
    }
}
export default getConfig();