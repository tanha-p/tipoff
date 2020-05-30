import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';

import {ProtectedRoute} from '../ProtectedRoute';
import PageTitle from '../../page-title/PageTitle';


describe("ProtectedRoute", () => {
    describe("render protected component for logged in user", () => {
        let props;
        let store;
        let wrapper;

        beforeEach(() => {
            props = {
                component: PageTitle
            }
            const initialState = {
                user: { 
                    currentUser: {
                        authenticated: true,
                        name: 'Test Test'
                    }
                }
            }   
            const mockStore = configureStore();
            store = mockStore(initialState);
            wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/"]}>
                        <ProtectedRoute  {...props}/>
                    </MemoryRouter>
                </Provider>
            );
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
            
            expect(wrapper.exists()).toEqual(true);
            expect(wrapper.find('PageTitle').length).toEqual(1);
        });
    });

    describe("redirects when user not authenticated", () => {
        let props;
        let store;
        let wrapper;

        beforeEach(() => {
            props = {
                component: PageTitle
            }
            const initialState = {
                user: { 
                    currentUser: {
                        authenticated: false,
                        name: ''
                    }
                }
            }   
            const mockStore = configureStore();
            store = mockStore(initialState);
            wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/"]}>
                        <ProtectedRoute  {...props}/>
                    </MemoryRouter>
                </Provider>
            );
        });

        it("matches snapshot", () => {
            const snap2 = renderer.create(
                    <Provider store={store}>
                        <MemoryRouter>
                            <ProtectedRoute {...props} />
                        </MemoryRouter>
                    </Provider>
            ).toJSON();
            expect(snap2).toMatchSnapshot();
        });

        it("redirects to `/` when not authenticated", () => {
            expect(wrapper.find('Redirect').length).toEqual(1);
            expect(wrapper.find('Redirect').props().to).toEqual("/");
        });
    })
    

    
});