import chai from 'chai';
import sinon from 'sinon';

const {expect} = chai;

import TipsSvc from '../tips-svc';
import Repo from '../../../dao/repositories/tips/tips-repository';
import ProjectSvc from '../../projects/projects-svc';

import TestUtils from '../../../utils/test-utils';

describe("Tips Svc", function() {
	describe("getTipById", function() {
		var stub;
		var projectStub;
		var project;
		const svc = new ProjectSvc();

		before(() => {
			project = TestUtils.getFakeRandomProjects(1)[0];
			project.projectName = project.project_name;
			
		})

		beforeEach(()=>{
			projectStub = sinon.stub(svc, "getProjectByProjectId").returns(Promise.resolve(project));
		});

		afterEach(() => {
			stub.restore();
			projectStub.restore();
		});

		it("should return tip if `getTipById` returns data", async function() {
			const fakeTips = TestUtils.getFakeTips(1);
			fakeTips[0].project_id = project.project_id;
			const repo = new Repo();
			stub = sinon.stub(repo, "getTipById").returns(Promise.resolve(fakeTips));
			const tipsSvc = new TipsSvc(repo, svc);
			const tipSvcStub = sinon.stub(tipsSvc, "_isUserAuthorizedToViewTips").returns(Promise.resolve(true));
			var req = {
				params : {
					tipId: "faketipid"
				}
			}
			const tip = await tipsSvc.getTipById(req).catch(err=>{
				console.log(err)
				expect.fail();
			});
			expect(stub.calledOnce).to.be.true;
			expect(tip.project_id).to.equal(project.project_id);
			expect(tip.project_name).to.equal(project.project_name);
			tipSvcStub.restore();
		});

		it("should throw `unauthorized` error if user is unauthorized", async function() {
			const fakeTips = TestUtils.getFakeTips(1);
			fakeTips[0].project_id = project.project_id;
			const repo = new Repo();
			stub = sinon.stub(repo, "getTipById").returns(Promise.resolve(fakeTips));
			const tipsSvc = new TipsSvc(repo, svc);
			
			const tipSvcStub = sinon.stub(tipsSvc, "_isUserAuthorizedToViewTips").returns(Promise.resolve(false));
			var req = {
				params : {
					tipId: "faketipid"
				}
			}
			const tip = await tipsSvc.getTipById(req).catch(err=>{
				expect(err.message).to.eq('unauthorized');
				expect(err).to.exist;
			});
			expect(stub.calledOnce).to.be.true;
			expect(tip).to.be.undefined;
		});

		it("should throw error if `getTipById` is rejected", async function() {
			const repo = new Repo();
			stub = sinon.stub(repo, "getTipById").returns(Promise.reject(new Error('rejected')));
			const tipsSvc = new TipsSvc(repo, svc);
			var req = {
				params : {
					tipId: "faketipid"
				}
			}
			const tips = await tipsSvc.getTipById(req).catch(err=>{
				expect(err).to.exist;
			});
			expect(stub.calledOnce).to.be.true;
			expect(tips).to.be.undefined;
		});
	});
});