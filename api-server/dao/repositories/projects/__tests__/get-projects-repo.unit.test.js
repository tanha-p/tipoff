import sinon from 'sinon';

import  chai from 'chai';
const {expect} = chai;

import TestUtils from '../../../../utils/test-utils';
import ProjectModel from '../../../models/projects/project-model';

import ProjectRepo from '../project-repository';

describe("ProjectRepo", () => {

	describe("getProjects", () => {
		let projectModelStub;
		let modelSortStub;
		let modelLimitStub;
		let modelSkipStub;
		let modelSelectStub;
		let repo;
		
		let fakeProjects;

		before(() => {
			repo = new ProjectRepo(ProjectModel);
			fakeProjects = TestUtils.getFakeRandomProjects(10);
		});

		beforeEach(() => {
			modelSortStub = sinon.stub().returnsThis();
			modelLimitStub = sinon.stub().returnsThis();
			modelSkipStub = sinon.stub().returnsThis();
			modelSelectStub = sinon.stub().resolves(fakeProjects);
			projectModelStub = sinon.stub(ProjectModel, 'find').returns({
				sort: modelSortStub,
				limit: modelLimitStub,
				skip: modelSkipStub,
				select: modelSelectStub
			});
		})
	
		afterEach(() =>{
			projectModelStub.restore();
		});
		
		it('`getProjects` works without items and pageNo params and defaults to 1st page and 10 items', async () => {
			const req = { userId: "test@tipoff.dev" }
			const projects = await repo.getProjects(req).catch(err => {
				expect.fail();
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(modelSortStub.calledWith({ created_on : -1 })).to.be.true;
			expect(modelLimitStub.calledWith(10)).to.be.true;
			expect(modelSkipStub.calledWith(0)).to.be.true;
			expect(modelSelectStub
				.calledWith({_id:0})).to.be.true;
			expect(projects).to.eq(fakeProjects);
			expect(modelSortStub.calledImmediatelyAfter(projectModelStub)).to.be.true;
			expect(modelLimitStub.calledImmediatelyAfter(modelSortStub)).to.be.true;
			expect(modelSkipStub.calledImmediatelyAfter(modelLimitStub)).to.be.true;
			expect(modelSelectStub.calledImmediatelyAfter(modelSkipStub)).to.be.true;
			
		});

		it('`getProjects` works with only items and userId param', async () => {
			const req = { items:5,userId: "test@tipoff.dev" }
			await repo.getProjects(req).catch(err => {
				expect.fail();
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(modelSkipStub.calledWith(0)).to.be.true;
			expect(modelLimitStub.calledWith(5)).to.be.true;
		});

		it('`getProjects` works with only pageNo and userId param', async () => {
			const req = { pageNo:2,userId: "test@tipoff.dev" }
			await repo.getProjects(req).catch(err => {
				expect.fail();
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(modelSkipStub.calledWith(10)).to.be.true;
			expect(modelLimitStub.calledWith(10)).to.be.true;
		});

		it('`getProjects` works with all params', async () => {
			const req = { pageNo:4, items:2, userId: "test@tipoff.dev" }
			await repo.getProjects(req).catch(err => {
				expect.fail();
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(modelSkipStub.calledWith(6)).to.be.true;
			expect(modelLimitStub.calledWith(2)).to.be.true;
		});

		it('`getProjects` throws error when userid is not passed', async () => {
			await repo.getProjects().catch(err => {
				expect(err).to.exist;
				expect(err.message).to.eq("userId must be passed to query projects");
			});
			expect(projectModelStub.calledOnce).to.be.false;
		});

		it("`getProjects` should throw error if model throws error", async () => {
			projectModelStub.restore();
			modelSelectStub = sinon.stub().rejects;
			const req = { pageNo:4, items:2, userId: "test@tipoff.dev" }
			projectModelStub = sinon.stub(ProjectModel, 'find').returns({
				sort: modelSortStub,
				limit: modelLimitStub,
				skip: modelSkipStub,
				select: modelSelectStub
			});
			let resp = await repo.getProjects(req).catch(err => {
				expect(err).to.exist;
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp).to.eq(undefined);
		});
	});

	

});