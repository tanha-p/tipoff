import {expect} from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import ProjectSvc from '../projects-svc';
import Repo from '../../../dao/repositories/projects/project-repository';
import TestUtils from '../../../utils/test-utils';

describe("ProjectSvc", () => {
	describe("getProjectByProjectId", () => {
		let stub;
		let req;
		let fakeProjects;

		before(() => {
			fakeProjects = TestUtils.getFakeRandomProjects(1);
			req = {
				params : {
					projectId: fakeProjects[0].project_id
				},
				loggedInUser : fakeProjects[0].project_owner
			}
		});

		afterEach(() => {
			stub.restore();
		});

		it("should return project if `getProjectByProjectId` returns data", async function() {
			const repo = new Repo();
			stub = sinon.stub(repo, "getProjectById").returns(Promise.resolve(fakeProjects));
			const projectSvc = new ProjectSvc(repo);
			const project = await projectSvc.getProjectByProjectId(req).catch(err=>{
				expect.fail();
			});
			expect(stub.calledOnce).to.be.true;
			expect(project).to.be.not.null;
			expect(project.projectName).to.eq(fakeProjects[0].project_name);
			expect(project.projectId).to.eq(fakeProjects[0].project_id);
		});

		it("should throw error if `getProjectByProjectId` is rejected", async function() {
			const repo = new Repo();
			stub = sinon.stub(repo, "getProjectById").returns(Promise.reject(new Error('rejected')));
			const projectSvc = new ProjectSvc(repo);
			const project = await projectSvc.getProjectByProjectId(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(stub.calledOnce).to.be.true;
			expect(project).to.be.undefined;
		});
	
	});

});