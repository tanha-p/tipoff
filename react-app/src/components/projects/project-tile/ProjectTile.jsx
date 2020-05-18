import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Card,
    CardHeader,
    CardHeaderTitle,
    CardFooterItem,
    CardContent,
    Content,
    CardFooter,
    Tag,
    Title,
    Icon
} from 'bloomer';

import { setTips, setPageNo, setTipsSearchTerm } from '../../../redux/tips/tips-actions';

import './ProjectTile.css';

export default function ProjectTile({project}) {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const navigateToTips = (project) => { 
        dispatch(setTips([]));
        dispatch(setPageNo(1));
        dispatch(setTipsSearchTerm(''));

        history.push({
            pathname: '/tips/'+project.projectId,
            state: { projectName: project.projectName }
        });
    }

    const navigateToEditProject = (projectId) => { 
        history.push('/project/'+projectId);
    }

    const navigateToSetupGuide = (projectId) => { 
        history.push({
            pathname:'/setup/'+projectId,
            state: { projectName: project.projectName }
        });
    }
    
    return (
        <Card className="project-tile">
            <CardHeader >
                <CardHeaderTitle className="project-tile-header" >
                    {project.projectName}
                </CardHeaderTitle>
            </CardHeader>
            
            <CardContent className="project-tile-content">
                
                <Content >
                    <div>
                        <Title isSize={6} tag='div' >
                            <Icon  className="fas fa-user" title="Members" /> 
                            {project.projectOwner} 
                            { project.members && project.members.length > 0 &&
                                <small> & {project.members.length} other</small>
                            }
                            { project.members && project.members.length > 1 &&
                                <small>s</small>
                            }
                        </Title>
                        
                    </div>
                    {
                        project.excludedEventTypes && project.excludedEventTypes.length ? 
                        (<React.Fragment>
                            {project.excludedEventTypes.map((event,index) => 
                                <Tag isSize='medium' className="project-tag" key={event+index}>
                                    <Icon className="far fa-bell-slash"  />
                                    <span>{event}</span>
                                </Tag> 
                            )}
                        </React.Fragment>) 
                        : 
                        (<React.Fragment />)
                    }
                </Content>
            </CardContent>
            <CardFooter className="project-tile-footer">
                <React.Fragment>
                    <CardFooterItem onClick={(e) => {navigateToSetupGuide(project.projectId)}} >
                        <Icon className='fas fa-cog' /> Setup
                    </CardFooterItem>
                    {project.isUserOwner ? (
                    <CardFooterItem  onClick={(e) => {navigateToEditProject(project.projectId)}}>
                        <Icon className='fas fa-edit' alt="Edit Project" /> Edit 
                    </CardFooterItem>
                    ) : (<></>)}
                    <CardFooterItem onClick={(e) => {navigateToTips(project)}} className="view-tips">
                        <Icon className='fas fa-paper-plane' /> Tips
                    </CardFooterItem>
                </React.Fragment>
            </CardFooter>
        </Card>
    )
}
