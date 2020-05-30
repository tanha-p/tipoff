import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import LoginForm from '../LoginForm';


describe("LoginForm", () => {
    let store,initialState, wrapper;

    beforeEach (()=>{
        initialState = {}   
        const mockStore = configureStore();
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><LoginForm /></Provider>);
    });

    it("matches snapshot", () => {
        const snap = renderer.create(<Provider store={store}><LoginForm /></Provider>).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('.box.login-box').length).toEqual(1);
    });
});