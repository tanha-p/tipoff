import chai from 'chai';
const {expect} = chai;
import supertest from 'supertest';
import mongoose from 'mongoose';

import loaders from '../../../server/loaders';
import ProjectModel from '../../../dao/models/projects/project-model';
import ProjectRepo from '../../../dao/repositories/projects/project-repository';
import TestUtils from '../../../utils/test-utils';
	
describe("Projects Route Controller(GetProjectById) - GET /api/v1/projects/:projectId", function() {
	let app;
	let user;
	let authToken;
	let respProject;
	let projectId;
	
	before(async () =>{
		app = await loaders();
		//load sample tips
		let projectObjs = TestUtils.getFakeRandomProjects(1);
		projectObjs[0].project_owner = "lead@tipoff.dev";
		projectObjs[0].project_id = "fakeprojectid";
		respProject = projectObjs[0];
		projectId = respProject.project_id;
		await new ProjectRepo().saveProjects(projectObjs);

		user = {
			userId : 'lead@tipoff.dev',
			name: 'Lead Tipoff',
			password: 'tiptest',
			confirmPassword: 'tiptest'
		}
		//setup user to access tips
		await supertest(app)
		.post('/api/v1/auth/register')
		.send(user)
		.expect((result) => {/* user added */})

		//get auth token by logging in
		await supertest(app)
		.post('/api/v1/auth/login')
		.send(user)
		.expect((result) => { authToken = 'Bearer '+result.body.data.token });

	});

	after(done => {
		ProjectModel.deleteMany({}, (res) => {
			mongoose.connection.close(done);
		});
	});

	it("/ works without issues with proper params", function(done) {
		supertest(app)
			.get("/api/v1/projects/"+projectId)
			.set('Authorization', authToken)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.data.projectId).to.equal(respProject.project_id);
			})
			.end(done);
    });
	
    
	it("/ throws 403 error without auth header", function(done) {
		supertest(app)
			.get("/api/v1/projects/"+projectId)
			.expect(403)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
			})
			.end(done);
    });
    
   
});


