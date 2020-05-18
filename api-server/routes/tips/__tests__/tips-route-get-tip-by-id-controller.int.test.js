import chai from 'chai';
const {expect} = chai;
import supertest from 'supertest';
import mongoose from 'mongoose';

import loaders from '../../../server/loaders';
import TipModel from '../../../dao/models/tip/tip-model';
import ProjectModel from '../../../dao/models/projects/project-model';
import TipsRepo from '../../../dao/repositories/tips/tips-repository';
import ProjectRepo from '../../../dao/repositories/projects/project-repository';
import TestUtils from '../../../utils/test-utils';
	
describe("Tips Route Controller - GET /api/v1/tips", function() {
	let app;
	let user;
	let authToken;
	let projectId;
	let projectName;
	let tipId;
	before(async () =>{
		app = await loaders();
		user = {
			userId : 'test-tipoff@tipoff.dev',
			name: 'Test Tipoff',
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

		//load sample project
		let projectObjs = TestUtils.getFakeRandomProjects(1);
		projectObjs[0].project_owner = user.userId;
		await new ProjectRepo().saveProjects(projectObjs);
		projectId = projectObjs[0].project_id;
		projectName = projectObjs[0].project_name;

		//load sample tips
		let tipObjs = TestUtils.getFakeTips(20);
		tipObjs = tipObjs.map(t => {
			return Object.assign(t,{
				project_id : projectId
			})
		});
		await new TipsRepo().saveTips(tipObjs);
		tipId = tipObjs[0].tip_id;
	});

	after(done => {
		TipModel.deleteMany({}, (res) => {
			
		});
		ProjectModel.deleteMany({}, (res) => {
			mongoose.connection.close(done);
		});
	});

	it("/ works with proper query params", function(done) {
		supertest(app)
			.get("/api/v1/tips/"+tipId)
			.set('Authorization', authToken)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(true);
				expect(res.body.data.project_id).to.equal(projectId);
				expect(res.body.data.project_name).to.equal(projectName);
			})
			.end(done);
	});


	it("/ throws 403 error without auth header", function(done) {
		supertest(app)
			.get("/api/v1/tips/"+tipId)
			.expect(403)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
			})
			.end(done);
	});
});


