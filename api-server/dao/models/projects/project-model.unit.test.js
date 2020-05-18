import  chai from 'chai';

const {assert,expect} = chai;

import ProjectModel from './project-model';

describe('Project Model ', () => {

	const goodProject = new ProjectModel({
        project_id: "1234",
        project_name: "test project",
        project_owner: "test@tipoff.dev"
    });
	
	// test cases
	it('returns error if required properties are not is passed',  (done) => {
		const project = new ProjectModel();
		project.validate(err => {
			expect(err.errors.project_id).to.exist;
			expect(err.errors.project_name).to.exist;
			expect(err.errors.project_owner).to.exist;
			done();
		});
	}); 

	it("works with correct project", (done) => {
        goodProject.validate(err => {
            if(err && err.errors){
                assert.fail("error received for valid input");
            }else{
                assert.ok('ok');
            }
            done();
        });
	});
	
	it("generates default created_on for each project ", (done) => {
        expect(goodProject.created_on).to.exist;
        done();
	});
	
	it("generates default archived as false for each project ", (done) => {
        expect(goodProject.archived).to.equal(false);
        done();
    });
		
});