import {SET_PROJECTS} from './projects-constants';

export const setProjects = projects => ({
    type: SET_PROJECTS,
    payload: projects
});

export default {setProjects};