import sinon from 'sinon';

import  chai from 'chai';
const {expect} = chai;

import TestUtils from '../../../../utils/test-utils';
import ProjectModel from '../../../models/projects/project-model';

import ProjectRepo from '../project-repository';

describe("ProjectRepo", () => {
	
	describe("getProjectById", () => {
		let projectModelStub;
		let modelSelectStub;
		let repo;
		
		let fakeProjects;

		before(() => {
			repo = new ProjectRepo(ProjectModel);
			fakeProjects = TestUtils.getFakeRandomProjects(1);
		});

		beforeEach(() => {
			modelSelectStub = sinon.stub().resolves(fakeProjects);
			projectModelStub = sinon.stub(ProjectModel, 'find').returns({
				select: modelSelectStub
			});
			
		})
	
		afterEach(() =>{
			projectModelStub.restore();
		});
		
		it('`getProjectById` works as expected when projectid is passed', async () => {
			
			const projects = await repo.getProjectById(fakeProjects[0].project_id ).catch(err => {
				expect.fail();
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(projectModelStub
				.calledWith({
					"project_id" : fakeProjects[0].project_id,
					"archived" : {"$ne":true}  
				})).to.be.true;
			expect(modelSelectStub.calledWith({_id:0})).to.be.true;
			expect(modelSelectStub.calledImmediatelyAfter(projectModelStub)).to.be.true;
			expect(projects).to.eq(fakeProjects);
		});
		
		it('`getProjectById` throws error when projectId is not passed', async () => {
			await repo.getProjectById().catch(err => {
				expect(err).to.exist;
				expect(err.message).to.eq("projectId must be passed to query projects");
			});
			expect(projectModelStub.calledOnce).to.be.false;
		});
		
		it("`getProjectById` should throw error if model throws error", async () => {
			projectModelStub.restore();
			modelSelectStub = sinon.stub().rejects;
			const req = { projectId: fakeProjects[0].project_id }
			projectModelStub = sinon.stub(ProjectModel, 'find').returns({
				select: modelSelectStub
			});
			let resp = await repo.getProjectById(req).catch(err => {
				expect(err).to.exist;
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp).to.eq(undefined);
		});
	});

});