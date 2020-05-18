import sinon from 'sinon';

import  chai from 'chai';
const {expect} = chai;

import TestUtils from '../../../utils/test-utils';
import UserModel from '../../models/user/user-model';

import UserRepo from './user-repository';

describe("UserRepo", () => {
	let userModelStub;
	let repo;
	let user;
	before(() => {
		user = TestUtils.getFakeRandomUsers(1)[0];
		repo = new UserRepo(UserModel);
	});
  
	afterEach(() =>{
		userModelStub.restore();
	});

	it("`getUserByUserId` should find valid user from db" , async () => {
		
		userModelStub = sinon.stub(UserModel, 'find').returns({
			select: sinon.stub().resolves(user)
		});
		const resp = await repo.getUserByUserId(user.user_id).catch(err => {
			expect.fail();
		});
		expect(userModelStub.calledOnce).to.be.true;
		expect(userModelStub.calledWith({user_id:user.user_id})).to.be.true;
		expect(resp.user_id).to.eq(user.user_id);
		
	});

	it("`getUserByUserId` should throw error when model throw error", async () => {
		let user = {}
		userModelStub = sinon.stub(UserModel, 'find').returns({
			select: sinon.stub().rejects
		});
		let resp = await repo.getUserByUserId(user.user_id).catch(err => {
			expect(err).to.exist;
		});
		expect(userModelStub.calledOnce).to.be.true;
		expect(resp).to.eq(undefined);
	});

	it("`addUser` should add valid user to the db" , async () => {
		userModelStub = sinon.stub(UserModel, 'create').resolves(user);
		const resp = await repo.addUser(user).catch(err => {
			expect.fail();
		})
		expect(userModelStub.calledOnce).to.be.true;
		expect(resp.user_id).to.eq(user.user_id);
	});

	
	it("`addUser` should throw error if model throws error", async () => {
		userModelStub = sinon.stub(UserModel, 'create').rejects();
		let resp = await repo.addUser(user).catch(err => {
			expect(err).to.exist;
		});
		expect(userModelStub.calledOnce).to.be.true;
		expect(resp).to.eq(undefined);
	});

});