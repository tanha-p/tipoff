import chai from 'chai';

const {assert, expect} = chai;

import UserModel from './user-model';

describe("UserModel", () => {

    const goodUser = new UserModel({
        user_id: "abcd@gg.com",
        name: "test test",
        password: "passpass",
        roles: ["admin"]
    });

    it("returns error if validation fails", (done) => {
        const badUser = new UserModel();
        badUser.validate(err => {
            expect(err.errors.password).to.exist;
            expect(err.errors.name).to.exist;
            expect(err.errors.user_id).to.exist;
            done();
        });
    });
    it("works with correct user", (done) => {
        goodUser.validate(err => {
            if(err && err.errors){
                assert.fail("error received for valid input");
            }else{
                assert.ok('ok');
            }
            done();
        });
        
    });

    it("generates default created_on for each user ", (done) => {
        expect(goodUser.created_on).to.exist;
        done();
    })

});
