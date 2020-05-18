import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../../../../redux/store';

import {ProtectedRoute} from '../ProtectedRoute';
import PageTitle from '../../page-title/PageTitle';


describe("ProtectedRoute", () => {
    let props;

    beforeEach(() => {
        props = {
            component: PageTitle,
            currentUser : {
                authenticated : true,
                name: 'Test Test'
            }
        }
    })

    it("matches snapshot", () => {
        const snap = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <ProtectedRoute {...props} />
                </MemoryRouter>
            </Provider>
       ).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders correct component when user is authenticated", () => {
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <ProtectedRoute  {...props}/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('PageTitle').length).toEqual(1);
    });

    it("redirects to `/` when not authenticated", () => {
        //un authenticate the user
        props.currentUser.authenticated = false;
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={["/"]}>
                    <ProtectedRoute  {...props}/>
                </MemoryRouter>
            </Provider>
        );
        expect(wrapper.find('Redirect').length).toEqual(1);
        expect(wrapper.find('Redirect').props().to).toEqual("/");
    });
});