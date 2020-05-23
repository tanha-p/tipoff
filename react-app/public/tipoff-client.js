
/*!
 * Tipoff Client Lib 1.0.0-rc.1 <https://www.tipoff.dev>
 * Copyright (c) 2020 Tanha P <https://www.tipoff.dev>
 * Released under MIT License
 */
/*! *****************************************************************************
    Copyright (c) Tipoff.dev. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

var Tipoff = (function() {
    var _setup = function(projectId, url) {
        if(!projectId || projectId.length===0) {
            console.log('Tipoff setup is invalid. Valid projectId is required. Tips will not be sent.');
            return false;
        }
        if(!url || url.length===0) {
            console.log('Tipoff setup is invalid. Valid url for Add Tip API is required. Tips will not be sent.');
            return false;
        }
        this.projectId = projectId;
        this.url = url;
    }
    var sendAjaxReq = function (tip, callback) {
        //Send XMLHTTPRequest
        var x = new(window.XMLHttpRequest || window.ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open('POST', Tipoff.url, 1);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', 'application/json');
        x.onreadystatechange = function () {
            x.readyState > 3 && callback && callback(x.responseText, x);
        };
        x.send(JSON.stringify(tip));
    }
    var _sendTip = function (argObj) {
        try {
            if(!this.projectId || this.projectId.length===0 || !this.url || this.url.length===0) {
                console.log('Tipoff setup is invalid. Call Tipoff.setup(<projectId>, <apiURL>) before sending Tips.');
                return false;
            }
            if(!argObj) {
                console.log('Invalid arguments. Tip was not sent.');
                return false;
            }
            var eventType = argObj.eventType;
            if(!eventType || eventType.length <=0 ) {
                console.log('eventType is missing.Tip was not sent. ');
                return false;
            } 
            var eventTitle = argObj.eventTitle;
            if(!eventTitle || eventTitle.length <=0 ) {
                console.log('eventTitle is missing.Tip was not sent. ');
                return false;
            } 
            var sendStackTrace = argObj.sendStackTrace ? argObj.sendStackTrace : false;
            var error = argObj.error;
            var tags = argObj.tags ? argObj.tags : [];
            var note = argObj.note ? argObj.note : [];
            var user = argObj.user;
            var callback = argObj.callback;
            var captureScreenshot = argObj.captureScreenshot ? argObj.captureScreenshot : false;

            
            var tip = {
                projectId : this.projectId,
                eventType: eventType,
                eventTitle : eventTitle,
                tags : tags,
                note : note,
                user : user
            }
            if(sendStackTrace) {
                var stack = "";
                if(error) {
                    stack = error.stack;
                } else {
                    try {
                        throw new Error();
                    } catch (e) {
                        stack = e.stack;
                    }
                }
                tip.eventStack = {
                    stackTrace : stack
                }
            }
            if(captureScreenshot) {
                window.html2canvas(document.body, {
                    allowTaint: true,
                    foreignObjectRendering: true,
                    height: document.querySelector("body").scrollHeight
                }).then(function(canvas) {
                    tip.screenshot = canvas.toDataURL();
                    sendAjaxReq(tip, callback);
                });
            }else {
                sendAjaxReq(tip, callback);
            }
        } catch (e) {
            console.log(e)
        }
    }
    return {
        version:'0.0.1',
        sendTip : _sendTip,
        setup: _setup
    }
} 
)();