import chai from 'chai';
const {expect} = chai;
import mongoose from 'mongoose';
import supertest from 'supertest';

import loaders from '../../server/loaders';
	
describe("Response security Headers", function() {

	let app;
	
	before(async () =>{
		app = await loaders();
	});

	after(done => {
		mongoose.connection.close(done);
	});

	it("should return proper security headers", function(done) {
		supertest(app)
			.put('/api/v1/auth/login')
			.send({})
            .expect('strict-transport-security', 'max-age=5184000; includeSubDomains')
            .expect('x-content-type-options', 'nosniff')
            .expect('x-download-options', 'noopen')
            .expect('x-frame-options', 'DENY')
            .expect('x-xss-protection', '1; mode=block')
            .expect('content-security-policy', /default-src/)
			.end(done);
	});

	
	
});
