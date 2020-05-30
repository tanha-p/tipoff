import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { mount} from 'enzyme';
import auth from '../../../../service/auth-svc';
import Header from '../Header';
import { useHistory } from 'react-router-dom';

const mockLogout = jest.spyOn(auth, 'logout');
mockLogout.mockResolvedValue({});

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useHistory :jest.fn().mockReturnValue([])
}));

describe("Header", () => {
    describe(`logged in user view`,()=> {
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

        it("renders appname correctly", () => {
            expect(wrapper.find('NavbarBrand').find('.logo-text').last().text()).toEqual('Tipoff');
        });

        it("renders username from redux store", () => {
            expect(wrapper.find('NavbarItem').find('.user-name').last().find('span').last().text()).toEqual(initialState.user.currentUser.name);
        });

        it("renders NavBar properly ", () => {
            expect(wrapper.find('Navbar').length).toEqual(1);
        });

        it("renders logo icon properly ", () => {
            expect(wrapper.find('NavbarBrand').find('Icon').hasClass('fa-dove')).toEqual(true);
        });

        it("signout button works as expected ", () => {
            const eventMock = { preventDefault: jest.fn() };
            wrapper.find('.button.sign-out-btn').props().onClick(eventMock) ;
            expect(mockLogout).toHaveBeenCalled();
        });

        it("logo icon click navigates user to homepage ", () => {
            const eventMock = { preventDefault: jest.fn() };
            wrapper.find('NavbarBrand').find('NavbarItem.logo').props().onClick(eventMock) ;
            expect(useHistory()).toContain('/app');
        });

        it("logo text click navigates user to homepage ", () => {
            const eventMock = { preventDefault: jest.fn() };
            wrapper.find('NavbarBrand').find('NavbarItem.logo-text').props().onClick(eventMock) ;
            expect(useHistory()).toContain('/app');
        });
    })

    describe(`user is not logged in view`,()=> {
        let store,initialState, wrapper;

        beforeEach (()=>{
            initialState = {
                user: { 
                    currentUser: {
                        authenticated: false,
                        name: ''
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

        it("renders appname correctly", () => {
            expect(wrapper.find('NavbarBrand').find('.logo-text').last().text()).toEqual('Tipoff');
        });

        it("renders logo icon properly ", () => {
            expect(wrapper.find('NavbarBrand').find('Icon').hasClass('fa-dove')).toEqual(true);
        });

        it("doesn't render username ", () => {
            expect(wrapper.find('NavbarItem').find('.user-name').last().find('span').last().text()).toEqual('');
        });

        it("hides NavbarMenu ", () => {
            expect(wrapper.find('NavbarMenu').hasClass('is-hidden')).toEqual(true);
        });
       
    })
    

});