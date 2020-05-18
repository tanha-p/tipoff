import sinon from 'sinon';

import  chai from 'chai';
const {expect} = chai;

import TestUtils from '../../../../utils/test-utils';
import ProjectModel from '../../../models/projects/project-model';

import ProjectRepo from '../project-repository';

describe("ProjectRepo", () => {
	
	describe("addProject", () => {
		let projectModelStub;
		
		let repo;
		let project;
	
		before(() => {
			project = TestUtils.getFakeRandomProjects(1)[0];
			repo = new ProjectRepo(ProjectModel);
			
		});
	  
		afterEach(() =>{
			projectModelStub.restore();
		});
		
		it("`addProject` should add valid project to the db" , async () => {
			projectModelStub = sinon.stub(ProjectModel, 'create').resolves(project);
			const resp = await repo.addProject(project).catch(err => {
				expect.fail();
			})
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp.project_id).to.eq(project.project_id);
		});
		
		it("`addProject` should throw error if model throws error", async () => {
			projectModelStub = sinon.stub(ProjectModel, 'create').rejects();
			let resp = await repo.addProject(project).catch(err => {
				expect(err).to.exist;
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp).to.eq(undefined);
		});
	});

});