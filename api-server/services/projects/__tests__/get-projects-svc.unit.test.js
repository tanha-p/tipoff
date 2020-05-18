import {expect} from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import ProjectSvc from '../projects-svc';
import Repo from '../../../dao/repositories/projects/project-repository';
import TestUtils from '../../../utils/test-utils';

describe("ProjectSvc", () => {
	describe("getProjects", () => {
		let stub;
		let req;
		let fakeProjects;

		before(() => {
			fakeProjects = TestUtils.getFakeRandomProjects(10);
			req = {
				query : {
					page: faker.pageNo,
					items: fakeProjects.length
				},
				loggedInUser : "test@tipoff.dev"
			}
		});

		afterEach(() => {
			stub.restore();
		});

		it("should return projects if `getProjects` returns data", async function() {
			
			const repo = new Repo();
			stub = sinon.stub(repo, "getProjects").returns(Promise.resolve(fakeProjects));
			const projectSvc = new ProjectSvc(repo);
			const projects = await projectSvc.getProjects(req).catch(err=>{
				expect.fail();
			});
			expect(stub.calledOnce).to.be.true;
			expect(projects.length).to.equal(fakeProjects.length);
			expect(projects[0].isUserOwner).to.exist;
			
		});

		it("should throw error if `getProjects` is rejected", async function() {
			const repo = new Repo();
			stub = sinon.stub(repo, "getProjects").returns(Promise.reject(new Error('rejected')));
			const projectSvc = new ProjectSvc(repo);
			const projects = await projectSvc.getProjects(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(stub.calledOnce).to.be.true;
			expect(projects).to.be.undefined;
		});
	
	});

});