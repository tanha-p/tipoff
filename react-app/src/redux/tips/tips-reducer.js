import {
    SET_TIPS, 
    SET_TIPS_SEARCHTERM,
    INCREMENT_TIPS_PAGE_NO,
    SET_PAGE_NO
} from './tips-constants';

const INITIAL_TIPS_STATE = { 
    tips: [],
    page: 1,
    items: 100,
    searchTerm : ''
}
const tipsReducer = (state = INITIAL_TIPS_STATE, action) => {
    if (action.type === SET_TIPS){
        return {
            ...state,
            tips : action.payload
        }
    } else if (action.type === SET_TIPS_SEARCHTERM ){
        return {
            ...state,
            searchTerm : action.payload
        }
    } else if (action.type === INCREMENT_TIPS_PAGE_NO ){
        return {
            ...state,
            page : state.page + 1
        }
    } else if (action.type === SET_PAGE_NO ){
        return {
            ...state,
            page : action.payload
        }
    } else {
        return state;
    }
}

export default tipsReducer;