import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import {TabContentRenderer} from '../TabContentRenderer';
import {LoginForm} from '../../login/login-form/LoginForm';
import {RegistrationForm} from '../../login/registration-form/RegistrationForm';

describe("Component", () => {

    let props;

    beforeEach(() => {
        props = {
            propForTabComponent: 'prop-val',
            tabs : {
                'login': LoginForm,
                'register': RegistrationForm
            },
            tab: 'login'
        };
    })


    it("matches snapshot", () => {
        const snap = renderer.create(
            <TabContentRenderer {...props} />
        ).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders with correct tab content", () => {
        const wrapper = shallow(<TabContentRenderer  {...props} />);
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('LoginForm').length).toEqual(1);
        expect(wrapper.find('RegistrationForm').length).toEqual(0);
    });

    it("renders corretcly after switching the tab name", () => {
        props.tab = 'register';
        const wrapper = shallow(<TabContentRenderer  {...props} />);
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.find('LoginForm').length).toEqual(0);
        expect(wrapper.find('RegistrationForm').length).toEqual(1);
    });

    it("passes rest of the props to rendered tab component properly", () => {
        const wrapper = shallow(<TabContentRenderer  {...props} />);
        expect(wrapper.find('LoginForm').props().propForTabComponent).toEqual(props.propForTabComponent);
    });
});