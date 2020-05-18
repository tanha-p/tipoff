import React, {useState} from 'react';
import {useRouteMatch, useLocation} from 'react-router-dom';
import PageTitle from '../common/page-title/PageTitle';
import HighlightCode from '../common/highlight-code/Highlight';
import {
    getClientLibCode, 
    addTipVerboseExampleCode,
    addTipMinimalExampleCode,
    getSendTipParameterList
} from './SetupUtil';
import {
    Card,
    CardHeader,
    CardContent,
    Content,
    CardHeaderTitle,
    Title,
    Table,
    Message,
    MessageBody,
    Button,
    MessageHeader,
    Icon,
    Box
} from 'bloomer';

import './SetupGuide.css';

export default function SetupGuide() {

    const match = useRouteMatch();
    const [projectId] = useState(match.params.id);
    var location = useLocation();
    const projectName = location.state ? location.state.projectName : projectId;
    const clientLib =  getClientLibCode(projectId);
    const addTipVerboseExample = addTipVerboseExampleCode();
    const addTipMinimalExample = addTipMinimalExampleCode();
    const params = getSendTipParameterList();
    const beforeBtnLabel = 'Send Test Tip';
    const afterBtnLabel = 'Tip sent successfully!';
    const errorBtnLabel = 'Tip not sent. Verify setup!';
    const [sendTipBtnLabel, setSendTipBtnLabel] = useState(beforeBtnLabel);

    const sendTip = (e) => {
        window.Tipoff.setup(projectId,'/api/v1/add-tip');
        var tip = {
            eventType:'test-tip',
            eventTitle:'Testing Send Tip functionality',
            sendStackTrace:true,
            tags:['tipoff'],
            note:'some note goes here..',
            user:{
                "user.Id" : 'testuser@tipoff.dev'
            },
            callback : function(data) {
                var resp = JSON.parse(data);
                if(resp && resp.success === true) {
                    setSendTipBtnLabel(afterBtnLabel);
                    setTimeout(() => {
                        setSendTipBtnLabel(beforeBtnLabel);
                    },2000);
                }else{
                    setSendTipBtnLabel(errorBtnLabel);
                    
                }
            },
            captureScreenshot : true
        }
        window.Tipoff.sendTip(tip);
    }

    return (
        <div>
            <PageTitle pageTitle={"Setup Guide"} ></PageTitle>
            <Card>
                <CardHeader>
                    <CardHeaderTitle className="tip-detail-title">How to setup {projectName} to send Tips to Tipoff server </CardHeaderTitle>
                </CardHeader>
                <CardContent>
                    <Content>
                        <div>
                            Once  you have added your project to Tipoff,  you need to setup your project to send Tips to the Tipoff Server. 
                            Follow the steps below to get started.
                        </div>
                        <div className="instruction-wrapper">
                            <div style={{marginTop:"2em"}}>
                                <Title isSize="5">1. Test project setup by sending a dummy Tip</Title>
                            </div>
                            Click the button below to send Test Tip to the Tipoff Server with your project setup.
                            Make sure to setup all emails in Edit Project screen that need to receive this Tip.
                            
                            <div style={{marginTop:"1em"}}>
                                <Button onClick={(e) => {sendTip(e)}} isSize="large" isColor="danger" >{sendTipBtnLabel}</Button>
                            </div>
                            Once you have successfully verified that you have received the Tip, proceed to step 2.
                        </div>
                        <div className="instruction-wrapper">
                            <Title isSize="5">2. Add Tipoff Client library to your application</Title>
                            <Message isColor="dark" className="setup-msg">
                                <MessageBody>This code is generated specifically for <strong>Project ID : {projectId}</strong> and 
                                    <div><strong>Tipoff Server</strong> running at <strong>{origin}</strong>.</div>
                                </MessageBody>
                            </Message>
                            Copy and paste the Tipoff Client Library setup for <strong>{projectName}</strong> seen below to the head section of 
                            your application's HTML page. 
                            
                            <HighlightCode code={clientLib} language="html"></HighlightCode>
                        </div>
                        <div className="instruction-wrapper">
                            <Title isSize="5">3. Call Tipoff.sendTip() whenever/wherever you want to log the event</Title>
                            Following is the bare minimum you will need to send the Tip.
                            <HighlightCode code={addTipMinimalExample} language="javascript"></HighlightCode>
                            There are other optional fields that can be sent with the Tip as well to make it more meaningful.
                            <HighlightCode code={addTipVerboseExample} language="javascript"></HighlightCode>
                            Here's the complete list of parameters that can be used with <strong>sendTip()</strong>
                            <Table isBordered isStriped={true} id="param-table">
                                <thead>
                                    <tr>
                                        <th>Parameter</th>
                                        <th>Required</th>
                                        <th>Searchable</th>
                                        <th>Description</th>
                                    </tr>
                                    { params.map((p) => {
                                        return (
                                            <tr key={p.name}>
                                                <td>{p.name}</td>
                                                <td>{p.required}</td>
                                                <td>{p.searchable}</td>
                                                <td>{p.desc}</td>
                                            </tr>
                                        )
                                    })}
                                </thead>
                            </Table>
                        </div>
                        
                        <Message style={{marginTop:"2em"}} isColor="warning">
                            <MessageHeader>
                                <p><Icon className="fas fa-exclamation-triangle"></Icon> With great power comes great responsibility 
                                <small> (Capturing Screenshots and other privacy concerns)</small></p>
                            </MessageHeader>
                            <MessageBody>
                                <Box>
                                    Capturing screenshot is an expensive operation. It also is storage heavy. Use extreme caution.
                                    Avoid sending too many screenshots.
                                </Box>
                                <Box>
                                    Screenshots and all other data part of the Tip can also compromise the end-user's privacy and security. 
                                    Make sure you have taken all precautions to secure the data as necessary.
                                </Box>
                                <Box>
                                    If you are not careful you may end up capturing and storing more data than what is disclosed
                                    in your Organization's GDPR and other privacy and data use policies. 
                                </Box>
                            </MessageBody>
                        </Message>
                        
                        
                        
                    </Content>
                </CardContent>
            </Card>
        </div>
    )
}
