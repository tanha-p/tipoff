import {SET_CURRENT_USER, USER_SIGN_OUT} from './user-constants';

export const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const userSignOut = user => ({
    type: USER_SIGN_OUT,
    payload: {}
});

export default {setCurrentUser};