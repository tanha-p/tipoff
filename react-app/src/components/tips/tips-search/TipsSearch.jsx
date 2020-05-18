import React,{useState}  from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import {
    Field,
    Control,
    Input,
    Icon,
    Button
} from 'bloomer';

import { setTipsSearchTerm, setTips, setPageNo } from '../../../redux/tips/tips-actions';
import { selectTipsSearchTerm } from '../../../redux/tips/tips-selectors';

import InfoModal from '../../common/info-modal/InfoModal';
import ModalContent from './tips-search-info-modal-content/TipsSearchInfoModalContent';


export const TipsSearch = () => {
    const searchTerm = useSelector(selectTipsSearchTerm, shallowEqual);
    const [term, setTerm] = useState(searchTerm);
    const [showSearchInfo, setShowSearchInfo] = useState(false);
    const dispatch = useDispatch();

    const searchTips = (e) => {
        e.preventDefault();
        dispatch(setTipsSearchTerm(term));
        dispatch(setTips([]));
        dispatch(setPageNo(1));
    }

    const change = e => {
        setTerm( e.target.value );
    }

    const toggleSearchInfoModal = e => {
        e.preventDefault();
        let nextModalState = showSearchInfo === false ? true : false;
        setShowSearchInfo(nextModalState);
    }

    return (
        <div style={{marginBottom:"1em"}}>
            <Field hasAddons="right"  isDisplay="flex">  
                    <Control>
                        <Button className="info-icon" onClick={(e) => {toggleSearchInfoModal(e)}}>
                            <Icon className="fas fa-info" />    
                        </Button>
                    </Control>       
                    <Control hasIcons  >
                        <Icon className="fas fa-search" />
                        <Input placeholder={'Search Tips'} onChange={e => change(e)} value={term} />
                    </Control>
                    <Control >
                        <Button isColor="dark" onClick={(e)=>searchTips(e)}>
                            <span className="is-hidden-touch">Search</span>
                            <span className="is-hidden-desktop">
                                <Icon className="fas fa-search" />
                            </span>
                        </Button>
                    </Control>
            </Field>
            <InfoModal 
                showInfoModal={showSearchInfo} 
                component={ModalContent} 
                modalHeaderTitle="Tips Search"
                closeModal={toggleSearchInfoModal}
            />
        </div>
    )
};

export default TipsSearch;
