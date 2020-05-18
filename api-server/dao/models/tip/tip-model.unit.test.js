import  chai from 'chai';

const {expect} = chai;


import TipModel from './tip-model';

describe('Tip Model ', () => {

	// test cases
	it('returns error if required properties are not is passed',  (done) => {
		const tip = new TipModel();
		tip.validate(err => {
			expect(err.errors.event_title).to.exist;
			expect(err.errors.event_type).to.exist;
			expect(err.errors.project_id).to.exist;
			done();
		});
		
	}); 
		
});