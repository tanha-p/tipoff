/* istanbul ignore file */

//switch to db
"use tipoff";

//Create index to DELETE documents older than 1 month using the TTL Index
db.tips.createIndex( { "created_on": 1 }, { expireAfterSeconds: 2592000 } );

//Create text index for string search
db.tips.createIndex({
    "event_type":"text",
    "tags":"text",
    "note": "text",
    "event_title":"text",
    "user_agent.browser.name":"text",
    "user_agent.browser.version":"text",
    "user_agent.browser.major":"text",
    "user_agent.engine.name":"text",
    "user_agent.engine.version":"text",
    "user_agent.os.name":"text",
    "user_agent.os.version":"text",
    "user_agent.cpu.architecture":"text",
    "user_agent.device.vendor":"text",
    "user_agent.device.model":"text",
    "user_agent.device.type":"text",
    "user.user_id":"text",
    "event_stack.stackTrace":"text"
});
