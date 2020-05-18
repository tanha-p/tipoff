import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import AppFooter from '../AppFooter';


describe("AppFooter", () => {
    it("matches snapshot", () => {
        const snap = renderer.create(<AppFooter />).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        const wrapper = shallow(<AppFooter />);
        expect(wrapper.exists()).toEqual(true);
    });
});