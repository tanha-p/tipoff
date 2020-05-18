import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';
import bcrypt from 'bcrypt';

const {expect} = chai;

import UserSvc from './user-svc';
import Repo from '../../dao/repositories/users/user-repository';

import TestUtils from '../../utils/test-utils';

describe("User Svc", function() {
	

	describe("addUser", function() {
        var req;
        var fakeUser;
        var repoStub;
        var svcStub;

		before(() => {
            fakeUser = TestUtils.getFakeRandomUserForUserSvcTest().fakeUser;
            req = TestUtils.getFakeRandomUserForUserSvcTest().req;
        });

        afterEach( () => {
            repoStub.restore();
            svcStub.restore();
        });

		it("should add user without issues ", async function() {
            const respProps = {
				password : '$2b$10$.VlBcNwuZYxsnRhzEeiKU.CvPdRxLRAMUHXKokpMERY.PV2pfP3GK'
			}
			const responseUser1 = Object.assign(fakeUser,respProps);
            const responseUser2 = Object.assign(responseUser1,{created_on : faker.date.past(1)});
			const repo = new Repo();
			repoStub = sinon.stub(repo, "addUser").returns(Promise.resolve(responseUser2));
			const userSvc = new UserSvc(repo);
			svcStub = sinon.stub(userSvc, "_createUserFromReq").returns(Promise.resolve(responseUser1));
            
			const resp = await userSvc.addUser(req).catch(err=>{
				expect.fail();
            });
			expect(repoStub.calledOnce).to.be.true;
			expect(svcStub.calledOnce).to.be.true;
			expect(resp.token).to.exist;
			expect(resp.user).to.exist;
			expect(resp.user.name).to.eq(responseUser2.name);
		});

		it("should throw error if `addUser` is rejected", async function() {
			const repo = new Repo();
			repoStub = sinon.stub(repo, "addUser").rejects();
			const userSvc = new UserSvc(repo);
			const resp = await userSvc.addUser(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(repoStub.calledOnce).to.be.true;
			expect(resp).to.be.undefined;
		});
	});

	describe("_createUserFromReq", () => {
        var bcryptStub;
        var req;

        before(() => {
            req = TestUtils.getFakeRandomUserForUserSvcTest().req;
        });
        
        afterEach( () => {
            bcryptStub.restore();
        });

		it("creates proper user object with correct input", async () => {
            bcryptStub = sinon.stub(bcrypt, "hash").returns(Promise.resolve("$2b$10$J96ZNSE3JptDp1cBzYCUzuycR4eibdBNQebX/jOV5.LmDPeXDPs.6"));
			
			const repo = new Repo();
			const userSvc = new UserSvc(repo);
			const user = await userSvc._createUserFromReq(req).catch(err=>{
				expect.fail();
            });
			expect(bcryptStub.calledOnce).to.be.true;
        });

        it("throws error if bcrypt throws error", async () => {
            bcryptStub = sinon.stub(bcrypt, "hash").rejects();
			
			const repo = new Repo();
			const userSvc = new UserSvc(repo);
			const user = await userSvc._createUserFromReq(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(bcryptStub.calledOnce).to.be.true;
            expect(user).to.be.undefined;
			
		});
	});
});