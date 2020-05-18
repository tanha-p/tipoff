import React, { useState, useEffect } from 'react';
import {useHistory, useRouteMatch} from 'react-router-dom';
import axios from 'axios';
import {
    Field,
    Label,
    Control,
    Input,
    Icon,
    Button,
    Message,
    MessageBody,
    Box,
    Tag,
    Delete,
    Help
} from 'bloomer';

import PageTitle from '../../common/page-title/PageTitle';
import FormError from '../../common/form-error/FormError';
import DeleteProject from '../delete-project/DeleteProject';
import InfoModal from '../../common/info-modal/InfoModal';
import {
    ProjectNameInfoModalContent, 
    EventTypeInfoModalContent, 
    ProjectMembersInfoModalContent,
    OriginInfoModalContent
} from './ProjectInfoModalContents';

import './AddEditProject.css';

export default function AddEditProject () {

    const history = useHistory();
    const [form,setForm] = useState({
        projectName: '',
        eventType:'',
        excludedEventTypes: [],
        member:'',
        members: [],
        origin:'',
        origins:[]
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [hideError, setHideError] = useState(true);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageTitle, setPageTitle] = useState('Create New Project');
    const [saveBtnTitle, setSaveBtnTitle] = useState('Add Project');
    const [updateProject, setUpdateProject] = useState(false);
    
    const match = useRouteMatch();
    const [projectId, setProjectId] = useState(match.params.id);
    
    useEffect(() => {
        
        if(projectId && projectId.length){
            axios.get(`/api/v1/projects/`+projectId).then(resp => {
                if(resp && resp.data && resp.data.success){
                    let project = resp.data.data;
                    setPageTitle('Edit '+project.projectName);
                    setSaveBtnTitle("Update Project");
                    setUpdateProject(true);
                    setForm(s => {
                        return {
                            ...s,
                            projectName: project.projectName,
                            excludedEventTypes: project.excludedEventTypes,
                            members: project.members,
                            origins: project.origins
                        }
                    });
                }
            },err => {});
        }
    }, [projectId,match]);

    const deleteEventType = e => {
        let tag = e.target.dataset.tag;
        let excludedEventTypes = form.excludedEventTypes;
        excludedEventTypes.splice(excludedEventTypes.indexOf(tag),1);
        setForm(s => {
            return {
                ...s,
                excludedEventTypes: excludedEventTypes
            }
        });
    }

    const deleteMember = e => {
        let tag = e.target.dataset.tag;
        let members = form.members;
        members.splice(members.indexOf(tag),1);
        setForm({
            ...form,
            members
        });
    }

    const deleteOrigin = e => {
        let tag = e.target.dataset.tag;
        let origins = form.origins;
        origins.splice(origins.indexOf(tag),1);
        setForm({
            ...form,
            origins
        });
    }

    const addEventType = e => {
        let eventType = form.eventType.trim();
        if(eventType.length){
            let excludedEventTypes = form.excludedEventTypes;
            excludedEventTypes.push(eventType);
            eventType = '';
            setForm({
                ...form,
                eventType,
                excludedEventTypes
            });
        }
    }

    const addMember = e => {
        let member = form.member.trim();
        if(member.length){
            let members = form.members;
            members.push(member);
            member = '';
            setForm({
                ...form,
                member,
                members
            });
        }
    }

    const addOrigin = e => {
        let origin = form.origin.trim();
        if(origin.length){
            let origins = form.origins;
            origins.push(origin);
            origin = '';
            setForm({
                ...form,
                origin,
                origins
            });
        }
    }

    const change = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const goBack = () => {
        history.goBack();
    }

    const navigateToHelpGuide = (e) => {
        e.preventDefault();
        history.push({
            pathname:'/setup/'+projectId,
            state: { projectName: form.projectName }
        });
    }

    const addUpdateProject = async (e) => {
        e.preventDefault();
        setHideError(true);
        setErrors([]);
        setLoading(true);

        const payload = {
            projectName : form.projectName,
            members : form.members,
            excludedEventTypes : form.excludedEventTypes,
            origins : form.origins
        }
        let url = updateProject ? `/api/v1/projects/${projectId}`:`/api/v1/projects/`; 
        
        axios.post(url, payload).then(resp => {
            if(resp && resp.data && resp.data.success){
                //project created
                setShowSuccess(true);
                let msg = `Project successfully created 
                with Project ID ${resp.data.data.projectId}.`;
                if(updateProject){
                    msg = `Project successfully updated. Click Back 
                button to go back to Projects.`;
                }
                setPageTitle(form.projectName);
                setProjectId(resp.data.data.projectId);
                setSuccessMsg(msg);
			}
		},err => {
            window.scrollTo(0,0);
            if(err.response.status === 422){
                let msgs = [];
                if(err.response.data && err.response.data.data
                        && err.response.data.data.err){
                    for(let i = 0 ; i < err.response.data.data.err.length ; i++){
                        let item = err.response.data.data.err[i];
                        
                        let param = '';
                        if(item.param === 'projectName'){
                           param = 'Name'
                        } else if(item.param.includes('members')){
                            param = item.value
                        } else if(item.param.includes('excludedEventTypes')){
                            param = 'Ignore Event Type'
                        } else if(item.param.includes('origins')){
                            param = 'Allowed Origin'
                        }
                        msgs.push(`${param} ${item.msg}`)
                    }
                } else {
                    msgs.push("Unprocessable entity")
                }
                setHideError(false);
                setErrors(msgs);
            } else {
                setHideError(false);
                setErrors(["An error occured while fulfilling the request."]);
            }
        })
        .finally(()=> {setLoading(false)});
    }

    const [showProjectNameInfo, setShowProjectNameInfo] = useState(false);
    const toggleProjectNameInfoModal = e => {
        e.preventDefault();
        let nextModalState = showProjectNameInfo === false ? true : false;
        setShowProjectNameInfo(nextModalState);
    }

    const [showEventTypeInfo, setShowEventTypeInfo] = useState(false);
    const toggleEventTypeInfoModal = e => {
        e.preventDefault();
        let nextModalState = showEventTypeInfo === false ? true : false;
        setShowEventTypeInfo(nextModalState);
    }

    const [showProjectMembersInfo, setShowProjectMembersInfo] = useState(false);
    const toggleProjectMembersInfoModal = e => {
        e.preventDefault();
        let nextModalState = showProjectMembersInfo === false ? true : false;
        setShowProjectMembersInfo(nextModalState);
    }

    const [showOriginInfo, setShowOriginInfo] = useState(false);
    const toggleOriginInfoModal = e => {
        e.preventDefault();
        let nextModalState = showOriginInfo === false ? true : false;
        setShowOriginInfo(nextModalState);
    }
    const beforeCopyLabel = 'Copy';
    const afterCopyLabel = 'Copied';
    const [copyText, setCopyText] = useState(beforeCopyLabel);
    const copyToCC = (content, e) => {
        e.preventDefault();
        navigator.clipboard.writeText(content);
        setCopyText(afterCopyLabel);
        setTimeout(() => {
            setCopyText(beforeCopyLabel);
        }, 2000);
    }

    return (
        <div>
            <PageTitle pageTitle={pageTitle}  loading={loading} ></PageTitle>
            <FormError hideError={hideError} errors={errors} />

            {/**
             * Name
             */}
            <Label>Name<Icon hasTextColor="danger" className="fas fa-asterisk required"></Icon></Label>
            <Field hasAddons="centered">
                <Control >
                    <Button className="info-icon" onClick={(e) => {toggleProjectNameInfoModal(e)}}>
                        <Icon className="fas fa-info" />    
                    </Button>
                </Control>    
                <Control isExpanded>
                    <Input type="text" disabled = {showSuccess}
                        placeholder='Project Name' 
                        name="projectName"
                        value={form.projectName} 
                        onChange={e => change(e)} />
                </Control>
            </Field>
            <InfoModal showInfoModal={showProjectNameInfo} 
                        component={ProjectNameInfoModalContent} 
                        modalHeaderTitle="Project Name"
                        closeModal={toggleProjectNameInfoModal} />

            {/**
             * Project ID
             */}
            {updateProject && 
                <>
                    <Label className="project-field">Project ID</Label>
                    <Field hasAddons="centered">
                        
                        <Control isExpanded >
                            <Input type="text" disabled = {true}
                                placeholder='Project Name' 
                                name="projectName"
                                value={projectId} 
                                onChange={e => change(e)} />
                        </Control>
                        <Control >
                            <Button isColor="dark" onClick={(e) => {copyToCC(projectId,e)}}>
                                {copyText}
                            </Button>
                        </Control>    
                    </Field>
                </>
            }


            {/**
             * Origins
             */}
            <Label  className="project-field">Allowed Origins (CORS)</Label>
            <Help> This is an optional field. However, it is highly recommended that you 
                limit the origins to only the ones that are related to this project to help 
                avoid unwanted security issues in future. 
                Click on <Icon className="fas fa-info" /> below to get more info.
            </Help>
            <Field  hasAddons="centered">
                <Control >
                    <Button className="info-icon" onClick={e => toggleOriginInfoModal(e)}>
                        <Icon className="fas fa-info" />    
                    </Button>
                </Control>    
                <Control isExpanded >
                    <Input type="text" disabled = {showSuccess}
                        name="origin"
                        value={form.origin}
                        onChange={e => change(e)}
                        placeholder='Enter new allowed origin for this project and click Add. Add multiple values one by one. ➤' />
                   
                </Control>
                <Control>
                    <Button isColor='dark' disabled = {showSuccess}
                        onClick={e => addOrigin(e)}>Add</Button>
                </Control>
            </Field>
            {form.origins && form.origins.length ? (
                <>
                    {form.origins.map((tag,index) => 
                        <Tag key={index} isSize="medium" className="dark-tag">
                            {tag} 
                            <Delete data-tag={tag} onClick={e => deleteOrigin(e)} />
                        </Tag>
                    )}
                </>
            ):( <></>)}
            <InfoModal showInfoModal={showOriginInfo} 
                        component={OriginInfoModalContent} 
                        modalHeaderTitle="Allowed Origins"
                        closeModal={toggleOriginInfoModal} />

            {/**
             * Members
             */}
            <Label  className="project-field">Members</Label>
            <Field  hasAddons="centered">
                <Control >
                    <Button className="info-icon" onClick={e => toggleProjectMembersInfoModal(e)}>
                        <Icon className="fas fa-info" />    
                    </Button>
                </Control>    
                <Control isExpanded>
                    <Input type="text" disabled = {showSuccess}
                        name="member"
                        value={form.member}
                        onChange={e => change(e)}
                        placeholder='Add new Project Member E-mail and click Add. Add multiple values one by one.  ➤' />
                </Control>
                <Control>
                    <Button isColor='dark' disabled = {showSuccess}
                        onClick={e => addMember(e)}>Add</Button>
                </Control>
            </Field>
            {form.members && form.members.length ? (
                <>
                    {form.members.map((tag,index) => 
                        <Tag key={index} isSize="medium" className="dark-tag">
                            {tag} 
                            <Delete data-tag={tag} onClick={e => deleteMember(e)} />
                        </Tag>
                    )}
                </>
            ):( <></>)}
            <InfoModal showInfoModal={showProjectMembersInfo} 
                        component={ProjectMembersInfoModalContent} 
                        modalHeaderTitle="Project Members"
                        closeModal={toggleProjectMembersInfoModal} />

            {/**
             * Ignore Event Types
             */}
            <Label className="project-field">Ignore Event Types </Label>
            <Field hasAddons="centered" >
                <Control>
                    <Button className="info-icon" onClick={(e) => {toggleEventTypeInfoModal(e)}}>
                        <Icon className="fas fa-info" />    
                    </Button>
                </Control>       
                <Control isExpanded>
                    <Input type="text" disabled = {showSuccess}
                        name="eventType"
                        value={form.eventType}
                        onChange={(e) => change(e)}
                        placeholder='Enter new Event Type and click Add. Add multiple values one by one. ➤' />
                </Control>
                <Control>
                    <Button isColor='dark' disabled = {showSuccess}
                        onClick={(e) => addEventType(e)} >Add</Button>
                </Control>
            </Field>
            {form.excludedEventTypes && form.excludedEventTypes.length ? (
                <>
                    {form.excludedEventTypes.map((tag,index) => 
                        <Tag key={index} isSize="medium" className="dark-tag">
                            {tag} 
                            <Delete data-tag={tag} onClick={e => deleteEventType(e)} />
                        </Tag>
                    )}
                </>
            ):( <></>)}
            <InfoModal showInfoModal={showEventTypeInfo} 
                        component={EventTypeInfoModalContent} 
                        modalHeaderTitle="Ignore Event Types"
                        closeModal={toggleEventTypeInfoModal} />

                           
            <Field isGrouped  className="project-field">
                <Control>
                    <Button disabled = {showSuccess}
                            isColor='dark' 
                            onClick={addUpdateProject} >{saveBtnTitle}</Button>
                </Control>
                <Control>
                    <Button isColor='light' onClick={goBack} >Back</Button>
                </Control>
            </Field>
            { showSuccess && (
                    <Box>
                        <Message isColor="dark">
                            <MessageBody>
                                <div>
                                    {successMsg}
                                </div>
                                <Button style={{marginTop:"1em"}}
                                    onClick={e=>navigateToHelpGuide(e)} 
                                    isColor="dark" >View Setup Guide</Button>

                            </MessageBody>
                        </Message>
                    </Box>
                ) 
            }
            {
                updateProject && (
                    <div style={{marginTop:"5em"}}>
                        <DeleteProject 
                            projectName={form.projectName} 
                            projectId={projectId} />
                    </div>
                )
            }
        </div>
    )
}


