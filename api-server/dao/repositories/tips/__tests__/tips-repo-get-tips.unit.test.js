import  chai from 'chai';
const {expect} = chai;
import sinon from 'sinon';
import TipModel from '../../../models/tip/tip-model';
import TestUtils from '../../../../utils/test-utils';
import Repo from '../tips-repository';

describe('Tip repo -> Get Tips Test', () => {
	let tipModelStub;
	let tipModelSortStub;
	let tipModelLimitStub;
	let tipModelSkipStub;
	let tipModelSelectStub;
	let fakeTips;
	let repo;

	before(async () => {
		fakeTips = TestUtils.getFakeTips(10);
		repo = new Repo(TipModel);
	});

	beforeEach(() => {
		tipModelSortStub = sinon.stub().returnsThis();
		tipModelLimitStub = sinon.stub().returnsThis();
		tipModelSkipStub = sinon.stub().returnsThis();
		tipModelSelectStub = sinon.stub().resolves(fakeTips);
		tipModelStub = sinon.stub(TipModel, 'find').returns({
			sort: tipModelSortStub,
			limit: tipModelLimitStub,
			skip: tipModelSkipStub,
			select: tipModelSelectStub
		});
	})
  
	afterEach(() =>{
		tipModelStub.restore();
	});

	// test cases
	it('`getTips` works with empty items and empty pageNo and defaults to 10 items', async () => {
		const req = {
			projectId : "fakeprojectid"
		}
		const tips = await repo.getTips(req).catch(err => {
			expect.fail();
		});
		expect(tipModelStub.calledOnce).to.be.true;
		expect(tipModelSortStub.calledWith({ created_on : -1 })).to.be.true;
		expect(tipModelLimitStub.calledWith(10)).to.be.true;
		expect(tipModelSkipStub.calledWith(0)).to.be.true;
		expect(tipModelSelectStub
			.calledWith({_id:0, __v:0, event_stack:0, 'user._id':0})).to.be.true;
		expect(tips).to.eq(fakeTips);
		expect(tipModelSortStub.calledImmediatelyAfter(tipModelStub)).to.be.true;
		expect(tipModelLimitStub.calledImmediatelyAfter(tipModelSortStub)).to.be.true;
		expect(tipModelSkipStub.calledImmediatelyAfter(tipModelLimitStub)).to.be.true;
		expect(tipModelSelectStub.calledImmediatelyAfter(tipModelSkipStub)).to.be.true;
		
	});
	
	it('`getTips` works without pageNo param', async () => {
		const req = { items:5,projectId : "fakeprojectid" }
		await repo.getTips(req).catch(err => {
			expect.fail();
		});
		expect(tipModelStub.calledOnce).to.be.true;
		expect(tipModelSkipStub.calledWith(0)).to.be.true;
		expect(tipModelLimitStub.calledWith(5)).to.be.true;
	});
	
	it('`getTips` works without items param', async () => {
		const req = { pageNo:2,projectId : "fakeprojectid" }
		await repo.getTips(req).catch(err => {
			expect.fail();
		});
		expect(tipModelSkipStub.calledWith(10)).to.be.true;
		expect(tipModelLimitStub.calledWith(10)).to.be.true;
	});

	it('`getTips` works with all params', async () => {
		const req = { pageNo:4, items:2, projectId : "fakeprojectid" }
		await repo.getTips(req).catch(err => {
			expect.fail();
		});
		expect(tipModelSkipStub.calledWith(6)).to.be.true;
		expect(tipModelLimitStub.calledWith(2)).to.be.true;
	});

	it('`getTips` throws error when model throws error', async () => {
		tipModelStub.restore();
		tipModelSelectStub = sinon.stub().rejects;
		tipModelStub = sinon.stub(TipModel, 'find').returns({
			sort: tipModelSortStub,
			limit: tipModelLimitStub,
			skip: tipModelSkipStub,
			select: tipModelSelectStub
		});
		await repo.getTips({projectId : "fakeprojectid"}).then(resp => {
			expect.fail();
		}).catch(err => {
			expect(err.message).to.exist;
		});
	});
	
  });
