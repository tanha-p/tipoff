import React from 'react';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';

import {Header} from '../Header';

describe("Header", () => {
    const props = {
        userSignOut: () => {},
        currentUser: {
            authenticated: true,
            name: 'Test Test'
        }
    }
    const wrapper = mount(<Header {...props} />);

    it("matches snapshot", () => {
        const snap = renderer.create(<Header {...props}  />).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("it renders appname as passed in props", () => {
        expect(wrapper.find('NavbarBrand').find('.logo-text').last().text()).toEqual('Tipoff');
    });

    it("it renders username as passed in props", () => {
        expect(wrapper.find('NavbarItem').find('.user-name').last().find('span').last().text()).toEqual(props.currentUser.name);
    });

    it("it renders NavBar properly ", () => {
        expect(wrapper.find('Navbar').length).toEqual(1);
    });

    it("it renders logo icon properly ", () => {
        expect(wrapper.find('NavbarBrand').find('Icon').hasClass('fa-dove')).toEqual(true);
    });

});