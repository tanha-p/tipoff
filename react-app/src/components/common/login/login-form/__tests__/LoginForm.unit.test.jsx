import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import LoginForm from '../LoginForm';


describe("LoginForm", () => {
    it("matches snapshot", () => {
        const snap = renderer.create(<LoginForm />).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        const wrapper = shallow(<LoginForm />);
        expect(wrapper.exists()).toEqual(true);
    });
});