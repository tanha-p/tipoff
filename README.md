
![Tipoff](https://www.tipoff.dev/tipoff_logo.png "Tipoff")

[![CircleCI](https://circleci.com/gh/tanha-p/tipoff.svg?style=shield&circle-token=23f4783a253fd6663dc11c92af89dbb50f744915)](https://circleci.com/gh/tanha-p/tipoff)

## What
Tipoff is an open source, flexible, private cloud or on-prem front-end monitoring platform that auto notifies the developers based on the preconfigured Tips it receives from the end-user browser.

It is created using the MERN stack. You can visit the complete stack [here](https://stackshare.io/tipoff/tipoff).

## Why
Tipoff helps you identify and fix bugs faster. You **get notified in realtime** before your customers notify you.

It gives you the flexibility to **keep the customer's data on your own servers** with complete control over securing and processing the data however you want. You don't need to worry about any third-party entity prying your customer's sensitive information.

## Demo

Click [here](https://demo.tipoff.dev) to see it in action

## Deploy on Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Run Tipoff locally
### Clone Tipoff
```
git clone https://github.com/tanha-p/tipoff
```
### Go to newly created Tipoff directory
```
cd tipoff
```
### Install Tipoff API Server Dependencies
```
npm install
```
### Configure environment variables
1. Create a new empty file and name it as **.env** and place it under **tipoff** directory
2. Copy everything from **.env.default** file and paste it in **.env** file
3. Set all the environment variable properties appropriately in **.env** file
>**NODE_ENV** in local is typically *development*
>
>**MONGODB_URI** is the connection url to your local mongoDB instance where Tipoff DB will be located
>
>**MONGODB_URI_TEST** is the connection url for running tests. *This URL must connect to a different DB than the one in **MONGODB_URI** since all data is cleaned up after tests are complete*
>
>**TIPOFF_API_PORT** is the port on which the Tipoff Server will serve the requests
>
>**JWT_SECRET_KEY** can be any string and is used to encrypt the passwords before storing it in the DB
>
>**NOTIFIER_API_KEY_SENDGRID** is used to send email notifications. Key can be generated using a free plan at https://sendgrid.com/pricing/
>
>**NOTIFIER_FROM_EMAIL_SENDGRID** is **from** email address that is **verified** on SendGrid and can be used to send Tip email notifications

After populating all enviroment variables, your resultant file will look something like this
```
# node application environment development,testing,staging,production
NODE_ENV=development

# mongodb database url
MONGODB_URI=mongodb://localhost:27017/tipoff
# mongodb database url to be used when running tests
MONGODB_URI_TEST=mongodb://localhost:27017/test-tipoff

# port number at which app will listen
# this is not required when deploying on heroku. the app will default to process.env.PORT for heroku
TIPOFF_API_PORT=5000

# secret key used to sign and validate auth token
JWT_SECRET_KEY=mysecretkey

#SendGrid API key to notify of new tips via email
NOTIFIER_API_KEY_SENDGRID=mysendgridapikey
#SendGrid From email to use when sending out email notifications
NOTIFIER_FROM_EMAIL_SENDGRID=no-reply@myapp.com
```
### Start Tipoff Server
```
npm start
```
Tipoff API server is ready to receive Tips @ the **TIPOFF_API_PORT**

### Install and Run the Tipoff UI to View Tips
1. In a new terminal tab or window, go to the Tipoff directory
2. drill down into **react-app** directory
```
cd react-app
```
3. Install the react application dependencies
```
npm install
```
4. If your **TIPOFF_API_PORT** is different from 5000 then change it in the package.json of React App. If your port is 5000 then you can skip this step
Find the following line in tipoff/react-app/package.json
```json
"proxy":  "http://localhost:5000"
```
and change it to
```json
"proxy":  "http://localhost:<your_new_api_port>"
```
5. Start the react-app
Within the react-app directory, run 
```
npm start
```
You can now navigate to Tipoff UI at http://localhost:3000 or your own react-app port
