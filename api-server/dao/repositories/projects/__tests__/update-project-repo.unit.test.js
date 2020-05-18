import sinon from 'sinon';

import  chai from 'chai';
const {expect} = chai;

import TestUtils from '../../../../utils/test-utils';
import ProjectModel from '../../../models/projects/project-model';

import ProjectRepo from '../project-repository';

describe("ProjectRepo", () => {
	
	describe("updateProject", () => {
		let projectModelStub;
		
		let repo;
		let project;
		let req;
	
		before(() => {
			project = TestUtils.getFakeRandomProjects(1)[0];
			req = {
				projectId: project.project_id,
				projectName: project.project_name,
				members: project.project_members,
				excludedEventTypes: project.excluded_event_types
			}
			repo = new ProjectRepo(ProjectModel);
		});
	  
		afterEach(() =>{
			projectModelStub.restore();
		});
		
		it("`updateProject` should update valid project to the db" , async () => {
			projectModelStub = sinon.stub(ProjectModel, 'findOneAndUpdate').resolves(project);
			const resp = await repo.updateProject(req).catch(err => {
				expect.fail();
			})
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp.project_id).to.eq(project.project_id);
		});
		
		it('`updateProject` throws error when projectId is not passed', async () => {
			projectModelStub = sinon.stub(ProjectModel, 'findOneAndUpdate').resolves(project);
			await repo.updateProject({projectId : null}).catch(err => {
				expect(err).to.exist;
				expect(err.message).to.eq("projectId must be passed to update the project");
			});
			expect(projectModelStub.calledOnce).to.be.false;
		});
		
		it("`updateProject` should throw error if model throws error", async () => {
			projectModelStub = sinon.stub(ProjectModel, 'findOneAndUpdate').rejects();
			let resp = await repo.updateProject(req).catch(err => {
				expect(err).to.exist;
			});
			expect(projectModelStub.calledOnce).to.be.true;
			expect(resp).to.eq(undefined);
		});
	});

});