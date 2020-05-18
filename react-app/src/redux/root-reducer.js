import {combineReducers} from 'redux';

import userReducer, {INITIAL_USER_STATE} from './user/user-reducer';
import tipsReducer from './tips/tips-reducer';
import projectsReducer from './projects/projects-reducer';
import {USER_SIGN_OUT} from './user/user-constants';

const appReducer = combineReducers({
    user:userReducer,
    tipsState:tipsReducer,
    projectsState: projectsReducer
});

const rootReducer = (state, action) => {
    if(action.type === USER_SIGN_OUT) {
        state = {
            user: INITIAL_USER_STATE
        }
    }
    return appReducer(state,action)
}

export default rootReducer;