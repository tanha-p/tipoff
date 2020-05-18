import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import axios from 'axios';
import {
    Columns,
    Column,
    Box,
    Title
} from 'bloomer';

import PageTitle from '../../common/page-title/PageTitle';
import ProjectTile from '../project-tile/ProjectTile';
import { setProjects } from '../../../redux/projects/projects-actions';
import {
    selectProjects, 
    selectProjectsItems, 
    selectProjectsPage
} from '../../../redux/projects/projects-selectors';

import './Projects.css';

export default function Projects() {

    const history = useHistory();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const projects = useSelector(selectProjects, shallowEqual);
	const page = useSelector(selectProjectsPage, shallowEqual);
    const items = useSelector(selectProjectsItems, shallowEqual);
    
    useEffect(() => {
        const getProjects = async () => {
            setLoading(true);
            axios.get(`/api/v1/projects?pageNo=${page}&items=${items}`)
            .then((resp) => {
                if(resp && resp.data && resp.data.success){
                    dispatch(setProjects(resp.data.data))
                }
            })
            .catch(err => { console.log(err) })
            .finally(()=> { setLoading(false) });
        }
		getProjects()
	}, [page, items, dispatch]);

    const navigateToAddProject = () => { history.push('/project') }
    
    return (
        <div>
            <PageTitle pageTitle="Projects" loading={loading} ></PageTitle>
            <Columns isMultiline  >
                {projects && projects.length ? (
                    <React.Fragment>
                    {
                        projects.map(project => 
                            <Column isSize='1/3' key={project.projectId} >
                                <ProjectTile project={project} />
                            </Column>)
                    }
                    </React.Fragment>
                    
                ): (
                    <React.Fragment />
                )
                }
                {/* Create new Project Tile */}
                <Column isSize='1/3'  >
                    <Box className="create-project-content" onClick={navigateToAddProject}>
                        <Title hasTextAlign="centered">Create</Title>
                        <Title hasTextAlign="centered">New</Title>
                        <Title hasTextAlign="centered">Project</Title>
                    </Box>  
                </Column>
            </Columns>
        </div>
    )
    
}


