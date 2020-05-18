import {
    SET_TIPS, 
    SET_TIPS_SEARCHTERM, 
    INCREMENT_TIPS_PAGE_NO, 
    SET_PAGE_NO
} from './tips-constants';

export const setTips = tips => ({
    type: SET_TIPS,
    payload: tips
});

export const setTipsSearchTerm = tipsSearchTerm => ({
    type: SET_TIPS_SEARCHTERM,
    payload: tipsSearchTerm
});

export const incrementPageNo = () => ({
    type: INCREMENT_TIPS_PAGE_NO,
    payload: {}
});

export const setPageNo = (pageNo) => ({
    type: SET_PAGE_NO,
    payload: pageNo
});

export default {setTips, setTipsSearchTerm, incrementPageNo, setPageNo};