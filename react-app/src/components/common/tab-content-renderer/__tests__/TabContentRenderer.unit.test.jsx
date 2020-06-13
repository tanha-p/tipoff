import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import {mount} from 'enzyme';

import TabContentRenderer from '../TabContentRenderer';
import {LoginForm} from '../../login/login-form/LoginForm';
import {RegistrationForm} from '../../login/registration-form/RegistrationForm';

describe("TabContentRenderer", () => {

    let props;
    let store,initialState, wrapper;

    beforeEach(() => {
        props = {
            propForTabComponent: 'prop-val',
            tabs : {
                'login': LoginForm,
                'register': RegistrationForm
            },
            tab: 'login'
        };
        initialState = {
            nextPath :  {
                nextPath: '/app'
            }
        }   
        const mockStore = configureStore();
        store = mockStore(initialState);
        wrapper = mount(
            <Provider store={store}>
                <TabContentRenderer {...props} />
            </Provider>
        );
    });


    it("matches snapshot", () => {
        const snap = renderer.create(
            <Provider store={store}>
                <TabContentRenderer {...props} />
            </Provider>
        ).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders with correct tab content", () => {
       
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('LoginForm').length).toEqual(1);
        expect(wrapper.find('RegistrationForm').length).toEqual(0);
    });

    it("renders corretcly after switching the tab name", () => {
        props.tab = 'register';
        wrapper = mount(
            <Provider store={store}>
                <TabContentRenderer {...props} />
            </Provider>
        );
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('LoginForm').length).toEqual(0);
        expect(wrapper.find('RegistrationForm').length).toEqual(1);
    });

    it("passes rest of the props to rendered tab component properly", () => {
        expect(wrapper.find('LoginForm').props().propForTabComponent).toEqual(props.propForTabComponent);
    });
});