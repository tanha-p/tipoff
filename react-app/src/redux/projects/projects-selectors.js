import {createSelector} from 'reselect';

const selectProjectsState = state => state.projectsState;

export const selectProjects = createSelector(
	[selectProjectsState],
	projectsState => projectsState.projects
);

export const selectProjectsPage = createSelector(
	[selectProjectsState],
	projectsState => projectsState.page
);

export const selectProjectsItems = createSelector(
	[selectProjectsState],
	projectsState => projectsState.items
);