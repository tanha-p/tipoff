import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import {RegistrationForm} from '../RegistrationForm';

describe("RegistrationForm", () => {
    let store,initialState, wrapper;

    beforeEach (()=>{
        initialState = {}   
        const mockStore = configureStore();
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><RegistrationForm /></Provider>);
    });

    it("matches snapshot", () => {
        const snap = renderer.create(<Provider store={store}><RegistrationForm /></Provider>).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        expect(wrapper.exists()).toEqual(true);
    });

});