import {createSelector} from 'reselect';

const selectTipsState = state => state.tipsState;

export const selectTips = createSelector(
	[selectTipsState],
	tipsState => tipsState.tips
);

export const selectTipsPageNo = createSelector(
	[selectTipsState],
	tipsState => tipsState.page
);

export const selectTipsItems = createSelector(
	[selectTipsState],
	tipsState => tipsState.items
);

export const selectTipsSearchTerm = createSelector(
	[selectTipsState],
	tipsState => tipsState.searchTerm
);