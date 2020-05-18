import {expect} from 'chai';

import TestUtils from './test-utils';
import {formatProjects} from './service-utils';

describe("Service Util Functions", () => {

	describe("formatProjects", () => {

		it("should format project db objects to response objects", () => {
			const projectsFromDB = TestUtils.getFakeRandomProjects(2);
			const projects = formatProjects(projectsFromDB, projectsFromDB[0].project_owner)
			expect(projects.length).to.eq(projectsFromDB.length);
			const ip = projectsFromDB[0];
			const op = projects[0];
			expect(op.projectName).to.eq(ip.project_name);
			expect(op.projectId).to.eq(ip.project_id);
			expect(op.members).to.eq(ip.project_members);
			expect(op.projectOwner).to.eq(ip.project_owner);
			expect(op.excludedEventTypes).to.eq(ip.excluded_event_types);
			expect(op.isUserOwner).to.eq(true);
		});

		it("should return empty array when no projects are passed", () => {
			const projects = formatProjects([], "test@test.com")
			expect(projects.length).to.eq(0);
		});
	});

});