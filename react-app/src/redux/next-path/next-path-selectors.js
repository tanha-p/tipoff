import {createSelector} from 'reselect';

const selectNextPathState = (state) => state.nextPath;

export const selectNextPath = createSelector(
	[selectNextPathState],
	(nextPathState) => nextPathState.nextPath
);