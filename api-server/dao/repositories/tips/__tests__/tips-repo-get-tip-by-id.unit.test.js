import  chai from 'chai';
const {expect} = chai;
import sinon from 'sinon';
import TipModel from '../../../models/tip/tip-model';
import TestUtils from '../../../../utils/test-utils';
import Repo from '../tips-repository';

describe('Tip repo -> Get Tip By ID Test', () => {
	let tipModelStub;
	let tipModelSelectStub;
	let fakeTip;
	let repo;

	before(async () => {
		fakeTip = TestUtils.getFakeTips(1);
		repo = new Repo(TipModel);
	});

	beforeEach(() => {
		tipModelSelectStub = sinon.stub().resolves(fakeTip);
		tipModelStub = sinon.stub(TipModel, 'find').returns({
			select: tipModelSelectStub
		});
	})
  
	afterEach(() =>{
		tipModelStub.restore();
	});

	// test cases
	it('`getTipById` works as expected', async () => {
		let tipId = "faketipid";
		const tips = await repo.getTipById(tipId).catch(err => {
			expect.fail();
		});
		expect(tipModelStub.calledOnce).to.be.true;
		expect(tipModelSelectStub
			.calledWith({_id:0, __v:0, 'user._id':0})).to.be.true;
		expect(tips).to.eq(fakeTip);
		expect(tipModelSelectStub.calledImmediatelyAfter(tipModelStub)).to.be.true;
		
	});

	it('`getTipById` throws error when tipid is missing', async () => {
		await repo.getTipById("").catch(err => {
			expect(err).to.exist;
			expect(err.message).to.eq("valid tipId is required.");
		});
		expect(tipModelStub.calledOnce).to.be.false;
	});

	it('`getTips` throws error when model throws error', async () => {
		tipModelStub.restore();
		tipModelSelectStub = sinon.stub().rejects;
		tipModelStub = sinon.stub(TipModel, 'find').returns({
			select: tipModelSelectStub
		});
		await repo.getTipById("faketipid").then(resp => {
			expect.fail();
		}).catch(err => {
			expect(err.message).to.exist;
		});
	});
	
  });
