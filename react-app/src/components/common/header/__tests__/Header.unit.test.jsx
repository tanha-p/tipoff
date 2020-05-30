import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { mount} from 'enzyme';

import Header from '../Header';

describe("Header", () => {
    let store,initialState, wrapper;

    beforeEach (()=>{
        initialState = {
            user: { 
                currentUser: {
                    authenticated: true,
                    name: 'Test Test'
                }
            }
        }   
        const mockStore = configureStore();
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><Header /></Provider>);
    });

    it("matches snapshot", () => {
        const snap = renderer.create(<Provider store={store}><Header /></Provider>).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("it renders appname as passed in props", () => {
        expect(wrapper.find('NavbarBrand').find('.logo-text').last().text()).toEqual('Tipoff');
    });

    it("it renders username as passed in props", () => {
        expect(wrapper.find('NavbarItem').find('.user-name').last().find('span').last().text()).toEqual(initialState.user.currentUser.name);
    });

    it("it renders NavBar properly ", () => {
        expect(wrapper.find('Navbar').length).toEqual(1);
    });

    it("it renders logo icon properly ", () => {
        expect(wrapper.find('NavbarBrand').find('Icon').hasClass('fa-dove')).toEqual(true);
    });

});