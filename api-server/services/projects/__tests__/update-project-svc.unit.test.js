import {expect} from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import ProjectSvc from '../projects-svc';
import Repo from '../../../dao/repositories/projects/project-repository';

describe("ProjectSvc", () => {
	describe("updateProject", () => {
		var project;
		var repoStub;
		var req;

		before(() => {
			req = {
				body :{
					
					projectName : "test",
					members : ["test1@test.com", "test2@test.com"],
					excludedEventTypes : ["success", "custom"]
				},
				params : {
					projectId : "somerandomid"
				}
			}

			project = {
				project_name : req.projectName,
				project_members : req.members,
				excluded_event_types : req.excludedEventTypes,
				project_owner: "lead@tipoff.dev",
				project_id: req.params.projectId
			}
		});

		afterEach( () => {
            repoStub.restore();
		});

		it("should throw error if `updateProject` is rejected", async function() {
			const repo = new Repo();
			repoStub = sinon.stub(repo, "updateProject").returns(new Error());
			const projectSvc = new ProjectSvc(repo);
			
			const resp = await projectSvc.updateProject(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(repoStub.calledOnce).to.be.true;
			expect(resp).to.be.undefined;
		});
		
		it("should update project without issues ", async function() {
            
            const responseProject = Object.assign(project,{created_on : faker.date.past(1)});
			const repo = new Repo();
			repoStub = sinon.stub(repo, "updateProject").returns(Promise.resolve(responseProject));
			const projectSvc = new ProjectSvc(repo);

			const resp = await projectSvc.updateProject(req).catch(err=>{
				expect.fail();
			});
			
			expect(repoStub.calledOnce).to.be.true;
			expect(resp.projectId).to.exist;
			expect(resp.projectId).to.eq(project.project_id);
		});
	
	});

});