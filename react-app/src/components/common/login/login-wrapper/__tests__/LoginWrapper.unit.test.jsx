import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../../../../../redux/store';

import LoginWrapper from '../LoginWrapper';

describe("LoginWrapper", () => {
    it("matches snapshot", () => {
        const snap = renderer.create(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginWrapper />
                </MemoryRouter>
            </Provider>
        ).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        const wrapper = shallow(<LoginWrapper />);
        expect(wrapper.exists()).toEqual(true);
    });
});