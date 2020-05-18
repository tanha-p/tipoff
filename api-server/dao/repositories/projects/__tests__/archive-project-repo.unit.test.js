import sinon from 'sinon';

import  chai from 'chai';
const {expect} = chai;

import TestUtils from '../../../../utils/test-utils';
import ProjectModel from '../../../models/projects/project-model';

import ProjectRepo from '../project-repository';

describe("ProjectRepo", () => {
	
	describe("archiveProject", () => {
		let projectModelStub;
		
		let repo;
		let project;
		let req;
	
		before(() => {
			project = TestUtils.getFakeRandomProjects(1)[0];
			project.archived = true;
			req = {
				projectId: project.project_id
			}
			repo = new ProjectRepo(ProjectModel);
		});
	  
		afterEach(() =>{
			projectModelStub.restore();
		});
		
		it("`archiveProject` should update valid project to the db" , async () => {
			projectModelStub = sinon.stub(ProjectModel, 'findOneAndUpdate').resolves(project);
			const resp = await repo.archiveProject(req).catch(err => {
				expect.fail();
			})
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp.project_id).to.eq(project.project_id);
			expect(resp.archived).to.eq(true);
		});
		
		it('`archiveProject` throws error when projectId is not passed', async () => {
			projectModelStub = sinon.stub(ProjectModel, 'findOneAndUpdate').resolves(project);
			await repo.archiveProject({projectId : null}).catch(err => {
				expect(err).to.exist;
				expect(err.message).to.eq("projectId must be passed to archive the project");
			});
			expect(projectModelStub.calledOnce).to.be.false;
		});
		
		it("`archiveProject` should throw error if model throws error", async () => {
			projectModelStub = sinon.stub(ProjectModel, 'findOneAndUpdate').rejects();
			let resp = await repo.archiveProject(req).catch(err => {
				expect(err).to.exist;
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp).to.eq(undefined);
		});
	});

});