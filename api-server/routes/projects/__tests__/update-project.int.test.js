import chai from 'chai';
const {expect} = chai;
import supertest from 'supertest';
import mongoose from 'mongoose';

import loaders from '../../../server/loaders';
import ProjectModel from '../../../dao/models/projects/project-model';
import ProjectRepo from '../../../dao/repositories/projects/project-repository';
import TestUtils from '../../../utils/test-utils';
	
describe("Projects Route Controller(UpdateProject) - POST /api/v1/projects/:projectId", function() {
	let app;
	let user;
	let authToken;
	let projectId;
	
	before(async () =>{
		app = await loaders();
		//load sample projects
		let projectObjs = TestUtils.getFakeRandomProjects(20);
		projectId = projectObjs[0].project_id;
		
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

	it("/ gives error with missing project name", function(done) {
		supertest(app)
			.post("/api/v1/projects/"+projectId)
			.send({
				members : [],
				excludedEventTypes : []
			})
			.set('Authorization', authToken)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('projectName');
				expect(res.body.data.err[0]).to.have.nested.property('msg');
			})
			.end(done);
	});

	it("/ gives error with wrong members param", function(done) {
		supertest(app)
			.post("/api/v1/projects/"+projectId)
			.send({
				projectName: 'test',
				members : ['abc','123'],
				excludedEventTypes : []
			})
			.set('Authorization', authToken)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('members[0]');
				expect(res.body.data.err[0].msg).to.equal('is not a valid email');
			})
			.end(done);
	});

	it("/ gives error with wrong excludedEventTypes param", function(done) {
		supertest(app)
			.post("/api/v1/projects/"+projectId)
			.send({
				projectName: 'test',
				members : [],
				excludedEventTypes : ['test','']
			})
			.set('Authorization', authToken)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('excludedEventTypes[1]');
				expect(res.body.data.err[0].msg).to.equal('must not be empty');
			})
			.end(done);
	});
    
	
	it("/ works with proper input", function(done) {
		const body = {
			projectName: 'new projectname',
			members : ['new1@test.com','new2@test.com'],
			excludedEventTypes : ['test','error']
		}
		supertest(app)
			.post("/api/v1/projects/"+projectId)
			.send(body)
			.set('Authorization', authToken)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(true);
				expect(res.body.data.projectName).to.equal(body.projectName);
				expect(res.body.data.members).to.contain.members(body.members);
				expect(res.body.data.excludedEventTypes).to.contain.members(body.excludedEventTypes);
			})
			.end(done);
	});
    
	it("/ throws 403 error without auth header", function(done) {
		const body = {
			projectName: 'new projectname',
			members : ['new1@test.com','new2@test.com'],
			excludedEventTypes : ['test','error']
		}
		supertest(app)
			.post("/api/v1/projects/"+projectId)
			.send(body)
			.expect(403)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
			})
			.end(done);
    });
   
});


