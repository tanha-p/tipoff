import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
    Message, 
    MessageHeader, 
    MessageBody,
    Icon,
    Button,
    Modal,
    ModalBackground,
    ModalCard,
    ModalCardBody,
    ModalCardFooter,
    ModalCardHeader,
    ModalCardTitle
} from 'bloomer';

import FormError from '../../common/form-error/FormError';

export default function DeleteProject({projectName, projectId}) {
    const [success, setSuccess] = useState(false);
    const [hideError, setHideError] = useState(true);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    const deleteProject = e => {
        e.preventDefault();
        console.log('deleting', projectId);
        axios.delete(`/api/v1/projects/`+projectId).then(resp => {
            if(resp && resp.data && resp.data.success){
                //project created
                setSuccess(true);
			}
		},err => {
            setHideError(false);
            setErrors(["An error occured while fulfilling the request."]); 
        });   
    }

    const navigateToProjects = (e) => { 
        e.preventDefault();
        history.push({
            pathname: '/app'
        });
    }

    return (
        <>
            <Message isColor="danger">
                <MessageHeader>Delete '{projectName}' Project</MessageHeader>
                <MessageBody>
                    <FormError hideError={hideError} errors={errors} />
                    <Icon className="fas fa-skull-crossbones" />
                    Once deleted, the project will no longer record 
                    or send out notifications for the tips received.<br/>
                    <code>This can't be undone.</code> <br/>
                    Please use extreme caution.
                    <div style={{"marginTop":"1em"}}>
                        <Button isColor='danger' onClick={e => deleteProject(e)} >
                            I understand, Delete this project.
                        </Button>
                    </div>
                </MessageBody>
            </Message>
            <Modal isActive={success}>
                <ModalBackground />
                <ModalCard>
                    <ModalCardHeader>
                        <ModalCardTitle>Project Deleted</ModalCardTitle>
                    </ModalCardHeader>
                    <ModalCardBody>
                        <code>{projectName}</code> is deleted successfully. It will no longer
                        receive new tips or send new notifications.
                    </ModalCardBody>
                    <ModalCardFooter>
                        <Button isColor='dark' onClick={e=>navigateToProjects(e)}>Back to Projects</Button>
                    </ModalCardFooter>
                </ModalCard>
            </Modal>
        </>
    )
}
