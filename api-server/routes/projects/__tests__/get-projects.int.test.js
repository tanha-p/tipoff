import chai from 'chai';
const {expect} = chai;
import supertest from 'supertest';
import mongoose from 'mongoose';

import loaders from '../../../server/loaders';
import ProjectModel from '../../../dao/models/projects/project-model';
import ProjectRepo from '../../../dao/repositories/projects/project-repository';
import TestUtils from '../../../utils/test-utils';
	
describe("Projects Route Controller(GetProjects) - GET /api/v1/projects", function() {
	let app;
	let user;
	let authToken;
	
	before(async () =>{
		app = await loaders();
		//load sample tips
		let projectObjs = TestUtils.getFakeRandomProjects(20);
		
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

	it("/ works without items or pageNo params", function(done) {
		supertest(app)
			.get("/api/v1/projects")
			.set('Authorization', authToken)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.data.length).to.equal(10);
			})
			.end(done);
    });

	it("/ gives error with wrong pageNo param", function(done) {
		supertest(app)
			.get("/api/v1/projects?pageNo=abc")
			.set('Authorization', authToken)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('pageNo');
				expect(res.body.data.err[0]).to.have.nested.property('msg');
			})
			.end(done);
	});
    
	it("/ gives error with pageNo greater than 100", function(done) {
		supertest(app)
			.get("/api/v1/projects?pageNo=101")
			.set('Authorization', authToken)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('pageNo');
				expect(res.body.data.err[0]).to.have.nested.property('msg');
			})
			.end(done);
	});
    
	it("/ gives error with wrong items param", function(done) {
		supertest(app)
			.get("/api/v1/projects?items=abc")
			.set('Authorization', authToken)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('items');
				expect(res.body.data.err[0]).to.have.nested.property('msg');
			})
			.end(done);
	});
    
	it("/ gives error with pageNo greater than 1000", function(done) {
		supertest(app)
			.get("/api/v1/projects?items=1001")
			.set('Authorization', authToken)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('items');
				expect(res.body.data.err[0]).to.have.nested.property('msg');
			})
			.end(done);
	});
    
	it("/ works with proper query params", function(done) {
		supertest(app)
			.get("/api/v1/projects?pageNo=2&items=4")
			.set('Authorization', authToken)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(true);
				expect(res.body.data.length).to.equal(4);
			})
			.end(done);
	});
    
	it("/ throws 403 error without auth header", function(done) {
		supertest(app)
			.get("/api/v1/projects?pageNo=2&items=4")
			.expect(403)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
			})
			.end(done);
    });
    
   
});


