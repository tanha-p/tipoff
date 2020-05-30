import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { Content  } from 'bloomer';
import axios from 'axios';

import { setTips } from '../../../redux/tips/tips-actions';
import { 
	selectTips, 
	selectTipsItems, 
	selectTipsPageNo, 
	selectTipsSearchTerm 
} from '../../../redux/tips/tips-selectors';

import TipsTable from '../tips-table/TipsTable';
import PageTitle from '../../common/page-title/PageTitle';
import TipsSerach from '../tips-search/TipsSearch';
import TipsLoadMore from '../tips-load-more/TipsLoadMore';


import './Tips.css';

export const Tips = () =>  {
	//declare all the hooks
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const tips = useSelector(selectTips, shallowEqual);
	var location = useLocation();
	
	const [loading, setLoading] = useState(false);
	const [showLoadMore, setShowLoadMore] = useState(true);
	const page = useSelector(selectTipsPageNo, shallowEqual);
	const items = useSelector(selectTipsItems, shallowEqual);
	const searchTerm = useSelector(selectTipsSearchTerm, shallowEqual);
	const id = match.params.id;
	const pageTitle = location.state ? location.state.projectName : id;
	//TODO get project name from db

	

	useEffect(() => {
		const minTips = (page-1) * items + 1;
		const maxTips = (page) * items;
		let currentTips = tips.length;

		const fetchNewTips = () => {
			
			if (minTips <= currentTips && currentTips <=maxTips ){
				return false;
			} else {
				return true;
			}
		}

		const isShowMoreViewable = () => {
			let viewable = currentTips === maxTips ? true : false;
			return viewable;
		}

		const getTips = async () => {
			
			if (fetchNewTips()){
				setLoading(true);
				axios.get(`/api/v1/tips?pageNo=${page}&items=${items}&projectId=${id}&searchTerm=${searchTerm}`)
					.then((resp) => {
						if(resp && resp.data && resp.data.success){
							const respTips = resp.data.data;
							let newTips = tips.concat(respTips);
							dispatch(setTips(newTips));
							currentTips = currentTips + respTips.length;
						}
					})
					.catch(err => { console.log(err) })
					.finally(()=> { 
						setLoading(false);
						setShowLoadMore(isShowMoreViewable())
					});
			} else {
				setShowLoadMore(isShowMoreViewable());
			}
			
		}
		getTips();
	}, [page, items, dispatch, id, searchTerm, tips]);

	

	return (
		<Content>
			<PageTitle pageTitle={pageTitle} loading={loading} />
			<TipsSerach ></TipsSerach>
			<TipsTable tips={tips} />
			{ showLoadMore && <TipsLoadMore /> }
		</Content>			
	);
}

export default Tips;
