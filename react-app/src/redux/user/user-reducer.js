import {SET_CURRENT_USER, USER_SIGN_OUT} from './user-constants';

export const INITIAL_USER_STATE = {
    currentUser: {
        name: '',
        authenticated: false
    }
}
const userReducer = (state = INITIAL_USER_STATE, action) => {
    if(action.type === SET_CURRENT_USER){
        return {
            ...state,
            currentUser : action.payload
        }
    } else if(action.type === USER_SIGN_OUT) {
        return INITIAL_USER_STATE
    } else{
        return state;
    }
}

export default userReducer;