import {SET_NEXT_PATH} from './next-path-constants';

export const INITIAL_NEXT_PATH_STATE = {
    nextPath: '/app'
}
const nextPathReducer = (state = INITIAL_NEXT_PATH_STATE, action) => {
    if(action.type === SET_NEXT_PATH){
        return {
            ...state,
            nextPath : action.payload
        }
    } else{
        return state;
    }
}

export default nextPathReducer;