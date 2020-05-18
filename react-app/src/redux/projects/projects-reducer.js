import {SET_PROJECTS} from './projects-constants';

const INITIAL_PROJECTS_STATE = { 
    projects: [],
    page: 1,
    items: 100
}
const projectsReducer = (state = INITIAL_PROJECTS_STATE, action) => {
    if(action.type === SET_PROJECTS){
        return {
            ...state,
            projects : action.payload
        }
    }else{
        return state;
    }
}

export default projectsReducer;