
var origin = window.location.origin;
const addTipAPIURL = origin + '/api/v1/add-tip';
var clientLibName = origin + '/tipoff-client.min.js';
export const getClientLibCode = (projectId) => {
    
    return `<script src="${clientLibName}"></script>
<script>
    Tipoff.setup('${projectId}','${addTipAPIURL}');
</script>`;
}

export const addTipVerboseExampleCode = () => {
    return `var tip = {
    eventType : "error", //required param
    eventTitle : "Error occurred in adding item to cart", // required param
    sendStackTrace : true, // default is false if not passed
    error : e, // optional error object
    tags : ["cart","product"], // tags are optional
    note : "Could be an issue with product setup", // note is optional
    user : { // user object is optional. If passed, will be stored as is in the DB after basic sanitization
        user_id : getLoggedInUserID(),
        //rest of the user object
    },
    callback : myFunc //optional,
    captureScreenshot : true //optional
};
Tipoff.sendTip(tip); //or window.Tipoff.sendTip(tip) if your linter complains about global variable`;
}

export const addTipMinimalExampleCode = () => {
    return `var tip = {
    eventType : "info", //required param
    eventTitle : "Verify button clicked 2 times" // required param
};
Tipoff.sendTip(tip); //or window.Tipoff.sendTip(tip) if your linter complains about global variable`;
}

export const getSendTipParameterList = () => {
    return [
        {
            name : "eventType",
            required : "Yes",
            searchable : "Yes",
            desc : `This is the eventType that is associated with each Tip. Tips with eventType as success, info, error, unhandled or warning get highlighted with appropriate color. eventType is not limited to only these types. Any custom eventType string is acceptable.` 
        },
        {
            name : "eventTitle",
            required : "Yes",
            searchable : "Yes",
            desc : `The purpose of this field is to provide human readable, meaningful title to the event.` 
        },
        {
            name : "sendStackTrace",
            required : "No",
            searchable : "Yes",
            desc : `This is an optional field and defaults to false. 
                When passed true, the stacktrace will be generated with the error object provided. 
                If no error object is provided then stacktrace will be auto-generated at that point in execution stack and sent with the Tip. 
                If the stacktrace is sent with the tip, the stacktrace is searchable for the text within.` 
        },
        {
            name : "error",
            required : "No",
            searchable : "N/A",
            desc : `This is used to pass error object to generate stackTrace. If sendStackTrace is false, the error parameter is ignored.` 
        },
        {
            name : "tags",
            required : "No",
            searchable : "Yes",
            desc : `This is an array of strings and can be used to pass different tags to the Tip and can help combine similar Tips while searching. 
            e.g. All events in the checkout flow can be tagged with 'checkout' tag and can later be searched using the same tag.` 
        },
        {
            name : "note",
            required : "No",
            searchable : "Yes",
            desc : `This field can be used to pass any kind of note related to the Tip that will help the analysis later on.` 
        },
        {
            name : "user",
            required : "No",
            searchable : "Partially",
            desc : `This can be used to pass the user object associated with the event. Passing user.user_id as a unique identifier is highly recommended when passing user object.
                   user_id field is searchable. Rest of the user object is not searchable and can be used to search all the Tips triggerred by the user_id.` 
        },
        {
            name : "callback",
            required : "No",
            searchable : "N/A",
            desc : `You can optionally pass a callback function which will be called if the Tip is posted successfully. 
                The callback function will receive the response from the add-tip API as a parameter.` 
        },
        {
            name : "captureScreenshot",
            required : "No",
            searchable : "N/A",
            desc : `This is an experimental feature. Behavior and consistency are not guaranteed. Use at your own risk. If set to true, Tipoff library will take the screenshot of the end-user's body 
                element and convert it to an image and send it to server. By default the value is false
                and no screenshot will be sent.` 
        }
    ]
}

export const getClientAjaxCode = (projectId) => { 
    return `try{
    //Create request data to send 
    var tip = { //Description for each field can be found in the table above
        projectId : '${projectId}', //projectId for your application
        eventType: "error",
        eventTitle : "Error occurred in adding item to cart",
        tags : ["cart","product"],
        note : "Could be an issue with product setup",
        user : { 
            user_id : getLoggedInUserID(),
            //rest of the user object
        },
        eventStack : {
            stackTrace : err.stack
        }
    };

    //Send XMLHTTPRequest
    var xhr = new(window.XMLHttpRequest || window.ActiveXObject)('MSXML2.XMLHTTP.3.0');
    xhr.open('POST', '${addTipAPIURL}', 1); //Tipoff server URL
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onreadystatechange = function () {
        if(xhr.readyState > 3 ) {
            console.log(xhr.responseText)
        }
    };
    xhr.send(JSON.stringify(tip));
} catch (e) {
    /* we bury the exception here because we don't want the actual client code to be
     * affected by the error in this optional functionality
     */
    console.log(e);
}`;
}