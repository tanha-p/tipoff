import {expect} from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import ProjectSvc from '../projects-svc';
import Repo from '../../../dao/repositories/projects/project-repository';

describe("ProjectSvc", () => {
	describe("deleteProject", () => {
		var project;
		var repoStub;
		var req;

		before(() => {
			req = {
				params : {
					projectId : "somerandomid"
				}
			}

			project = {
				project_name : 'test proj',
				project_members : [],
				excluded_event_types : [],
				project_owner: "lead@tipoff.dev",
				project_id: req.params.projectId,
				archived: true
			}
		});

		afterEach( () => {
            repoStub.restore();
		});

		it("should throw error if `deleteProject` is rejected", async function() {
			const repo = new Repo();
			repoStub = sinon.stub(repo, "archiveProject").returns(new Error());
			const projectSvc = new ProjectSvc(repo);
			
			const resp = await projectSvc.deleteProject(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(repoStub.calledOnce).to.be.true;
			expect(resp).to.be.undefined;
		});
		
		it("should delete project without issues ", async function() {
            
            const responseProject = Object.assign(project,{created_on : faker.date.past(1)});
			const repo = new Repo();
			repoStub = sinon.stub(repo, "archiveProject").returns(Promise.resolve(responseProject));
			const projectSvc = new ProjectSvc(repo);

			const resp = await projectSvc.deleteProject(req).catch(err=>{
				expect.fail();
			});
			
			expect(repoStub.calledOnce).to.be.true;
			expect(resp).to.exist;
			expect(resp).to.contain(project.project_id);
		});
	
	});

});