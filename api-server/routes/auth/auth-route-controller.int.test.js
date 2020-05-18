import chai from 'chai';
const {expect} = chai;
import mongoose from 'mongoose';
import supertest from 'supertest';

import TestUtils from '../../utils/test-utils';
import loaders from '../../server/loaders';
import UserModel from '../../dao/models/user/user-model';
	
describe("Auth Route Controller", function() {

	let $api_url_register;
	let $api_url_login;
	let app;
	let fakeUser;
	let validUser;
	
	before(async () =>{
		$api_url_register = '/api/v1/auth/register';
		$api_url_login = '/api/v1/auth/login';
		app = await loaders();
		fakeUser = TestUtils.getFakeRandomUsers(1)[0];
		validUser = {
			userId : 'Luisa.Win_theiser54@gmail.com',
			password: fakeUser.password,
			name: fakeUser.name,
			confirmPassword: fakeUser.password
		}
		
	});

	after(done => {
		UserModel.deleteMany({}, (res) => {
			mongoose.connection.close(done);
		});
	});

	it("POST /api/v1/auth/register works with proper params", function(done) {
		supertest(app)
			.post($api_url_register)
			.send(validUser)
			.expect(201)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(true);
				expect(res.body.data.validUser).to.equal(true);
				expect(res.body.data.user.name).to.equal(validUser.name);
				expect(res.body.data.token).to.exist;
			})
			.end(done);
	});

	it("POST /api/v1/auth/register duplicate user returns error", function(done) {
		supertest(app)
			.post($api_url_register)
			.send(validUser)
			.expect(409)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err).to.contain(validUser.userId.toLowerCase());
			})
			.end(done);
	});



	it("POST /api/v1/auth/register gives error password and confirmpassword doesnt match", function(done) {
		supertest(app)
			.post($api_url_register)
			.send({
				userId : fakeUser.user_id,
				password: fakeUser.password,
				name: fakeUser.name,
				confirmPassword: 'test'
			})
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('confirmPassword');
				expect(res.body.data.err[0]).to.have.nested.property('msg');
			})
			.end(done);
	});

	it("POST /api/v1/auth/register gives error with missing params", function(done) {
		supertest(app)
			.post($api_url_register)
			.send({})
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err).to.exist;
			})
			.end(done);
	});

	it("POST /api/v1/auth/register gives error with missing params", function(done) {
		supertest(app)
			.post($api_url_register)
			.send({})
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err).to.exist;
			})
			.end(done);
	});

	it("POST /api/v1/auth/login gives valid token with valid request", function(done) {
		let req = {
			userId : validUser.userId,
			password: validUser.password
		}
		supertest(app)
			.post($api_url_login)
			.send(req)
			.expect(200)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(true);
				expect(res.body.data.validUser).to.equal(true);
				expect(res.body.data.token).to.exist;
			})
			.end(done);
	});

	it("POST /api/v1/auth/login gives 403 for wrong password", function(done) {
		let req = {
			userId : validUser.userId,
			password: 'wrongpwd'
		}
		supertest(app)
			.post($api_url_login)
			.send(req)
			.expect(401)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
			})
			.end(done);
	});

	it("POST /api/v1/auth/login gives 422 for missing pwd", function(done) {
		let req = {
			userId : validUser.userId,
			password: ''
		}
		supertest(app)
			.post($api_url_login)
			.send(req)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('password');
			})
			.end(done);
	});

	it("POST /api/v1/auth/login gives 422 for missing userId", function(done) {
		let req = {
			password: 'somepwd'
		}
		supertest(app)
			.post($api_url_login)
			.send(req)
			.expect(422)
			.expect('Content-Type', /json/)
			.expect((res) => {
				expect(res.body.success).to.equal(false);
				expect(res.body.data.err[0].param).to.equal('userId');
			})
			.end(done);
	});
	
});
