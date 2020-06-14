import { getLoggedInUserFromReq } from './auth-utils';
import CommonUtils from './common-utils';

export const createProjectFromReq = (req) => {
	const { projectName, members, excludedEventTypes } = req.body;
	let project = {
		project_id: CommonUtils.getCuid(),
		project_owner: getLoggedInUserFromReq(req),
		project_name: projectName,
		project_members: members,
		excluded_event_types: excludedEventTypes
	};
	return project;
};

export const formatProjects = (projects, loggedInUser) => {
	return projects.map((p) => {
		return {
			projectName: p.project_name,
			projectId: p.project_id,
			projectOwner: p.project_owner,
			members: p.project_members,
			excludedEventTypes: p.excluded_event_types,
			createdOn: p.created_on,
			origins: p.origins,
			isUserOwner: loggedInUser === p.project_owner ? true : false
		};
	});
};

export const formatTip = (tip, tipId, projectName) => {
	tip = JSON.stringify(tip);
	let t = JSON.parse(tip);
	(t.tip_id = tipId), (t.project_name = projectName);
	return t;
};

export const createTipFromReq = (req) => {
	let {
		projectId,
		eventType,
		eventTitle,
		eventStack,
		tags,
		note,
		user,
		screenshot
	} = req.body;
	if (!Array.isArray(tags)) {
		tags = [];
	}
	if (typeof note !== 'string') {
		note = '';
	}
	const referer = req.header('Referer');
	return {
		tip_id: CommonUtils.getCuid(),
		project_id: projectId,
		event_type: eventType,
		event_title: eventTitle,
		event_stack: eventStack,
		tags: tags,
		note: note,
		user: user,
		referer: referer,
		screenshot: screenshot,
		user_agent: CommonUtils.getUserAgentFromReq(req)
	};
};
