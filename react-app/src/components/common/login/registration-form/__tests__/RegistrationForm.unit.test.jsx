import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import {RegistrationForm} from '../RegistrationForm';


describe("RegistrationForm", () => {
    it("matches snapshot", () => {
        const snap = renderer.create(<RegistrationForm />).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        const wrapper = shallow(<RegistrationForm />);
        expect(wrapper.exists()).toEqual(true);
    });
});