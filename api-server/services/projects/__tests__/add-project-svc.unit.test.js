import {expect} from 'chai';
import sinon from 'sinon';
import faker from 'faker';

import ProjectSvc from '../projects-svc';
import Repo from '../../../dao/repositories/projects/project-repository';

describe("ProjectSvc", () => {
	describe("addProject", () => {
		var project;
		var repoStub;
		var req;

		before(() => {
			req = {
				body :{
					projectName : "test",
					members : ["test1@test.com", "test2@test.com"],
					excludedEventTypes : ["success", "custom"]
				}
			}

			project = {
				project_name : req.body.projectName,
				project_members : req.body.members,
				excluded_event_types : req.body.excludedEventTypes,
				project_owner: "lead@tipoff.dev",
				project_id: "somerandomid"
			}
		});

		afterEach( () => {
            repoStub.restore();
            
		});

		it("should throw error if `addProject` is rejected", async function() {
			const repo = new Repo();
			repoStub = sinon.stub(repo, "addProject").returns(new Error());
			const projectSvc = new ProjectSvc(repo);
			
			const resp = await projectSvc.addProject(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(repoStub.calledOnce).to.be.true;
			expect(resp).to.be.undefined;
		});
		
		it("should add project without issues ", async function() {
            
            const responseProject = Object.assign(project,{created_on : faker.date.past(1)});
			const repo = new Repo();
			repoStub = sinon.stub(repo, "addProject").returns(Promise.resolve(responseProject));
			const projectSvc = new ProjectSvc(repo);

			const resp = await projectSvc.addProject(req).catch(err=>{
				expect.fail();
			});
			expect(repoStub.calledOnce).to.be.true;
			expect(resp.projectId).to.exist;
			expect(resp.projectId).to.eq(project.project_id);
		});
	
	});

});