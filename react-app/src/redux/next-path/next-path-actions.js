import {SET_NEXT_PATH} from './next-path-constants';

export const setNextPath = path => ({
    type: SET_NEXT_PATH,
    payload: path
});

export default {setNextPath};