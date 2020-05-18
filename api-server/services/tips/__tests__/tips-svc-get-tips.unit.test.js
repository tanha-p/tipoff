import chai from 'chai';
import sinon from 'sinon';
import faker from 'faker';

const {expect} = chai;

import TipsSvc from '../tips-svc';
import Repo from '../../../dao/repositories/tips/tips-repository';
import ProjectSvc from '../../projects/projects-svc';

import TestUtils from '../../../utils/test-utils';

describe("Tips Svc", function() {
	describe("getTips", function() {
		var stub;
		var projectStub;
		var project;
		const svc = new ProjectSvc();

		before(() => {
			project = TestUtils.getFakeRandomProjects(1)[0];
		});

		beforeEach(()=>{
			projectStub = sinon.stub(svc, "getProjectByProjectId").returns(Promise.resolve(project));
		});

		afterEach(() => {
			stub.restore();
			projectStub.restore();
		});

		it("should return tips if `getTips` returns data", async function() {
			const fakeTips = TestUtils.getFakeTips();
			const repo = new Repo();
			stub = sinon.stub(repo, "getTips").returns(Promise.resolve(fakeTips));
			const tipsSvc = new TipsSvc(repo);
			const tipSvcStub = sinon.stub(tipsSvc, "_isUserAuthorizedToViewTips").returns(Promise.resolve(true));

			var req = {
				query : {
					pageNo:faker.pageNo, 
					items:fakeTips.length, 
					projectId : "fakeprojectid"
				}
			}
			const tips = await tipsSvc.getTips(req).catch(err=>{
				console.log(err)
				expect.fail();
			});
			expect(stub.calledOnce).to.be.true;
			expect(tips.length).to.equal(fakeTips.length);
			tipSvcStub.restore();
		});

		it("should throw `unauthorized` error if user is unauthorized", async function() {
			const fakeTips = TestUtils.getFakeTips();
			const repo = new Repo();
			stub = sinon.stub(repo, "getTips").returns(Promise.resolve(fakeTips));
			const tipsSvc = new TipsSvc(repo);
			const tipSvcStub = sinon.stub(tipsSvc, "_isUserAuthorizedToViewTips").returns(Promise.resolve(false));
			
			var req = {
				query : {
					pageNo:faker.pageNo, 
					items:fakeTips.length, 
					projectId : "fakeprojectid"
				}
			}
			const tips = await tipsSvc.getTips(req).catch(err=>{
				expect(err.message).to.eq('unauthorized');
				expect(err).to.exist;
			});
			expect(stub.callCount).to.eq(0);
			expect(tips).to.be.undefined;
			tipSvcStub.restore();
		});

		it("should throw error if `getTips` is rejected", async function() {
			const repo = new Repo();
			stub = sinon.stub(repo, "getTips").returns(Promise.reject(new Error('rejected')));
			const tipsSvc = new TipsSvc(repo);
			const tipSvcStub = sinon.stub(tipsSvc, "_isUserAuthorizedToViewTips").returns(Promise.resolve(true));
			var req = {
				query : {
					pageNo:faker.pageNo, 
					projectId : "fakeprojectid"
				}
			}
			const tips = await tipsSvc.getTips(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(stub.calledOnce).to.be.true;
			expect(tips).to.be.undefined;
			tipSvcStub.restore();
		});
	});
});