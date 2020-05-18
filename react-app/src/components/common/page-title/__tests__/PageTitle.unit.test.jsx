import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import PageTitle from '../PageTitle';

describe("PageTitle", () => {
    
    it("matches snapshot", () => {
        const tree = renderer.create(<PageTitle pageTitle="Tips" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should display the title passed into the property", () => {
        const wrapper = shallow(<PageTitle pageTitle="My App"></PageTitle>);
        expect(wrapper.hasClass('pageTitle')).toEqual(true);
        expect(wrapper.render().text()).toEqual('My App');
    });
    
});
