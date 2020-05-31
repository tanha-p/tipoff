import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import FormError from '../FormError';

describe("FormError", () => {
    describe("has errors", () => {
        let props, wrapper;
        beforeAll(() => {
            props = {
                hideError : false,
                errors : [`Error 1 occured`, `Error 2 occurred`]
            }
            wrapper = shallow(<FormError {...props} />);
        });

        it("matches snapshot", () => {
            const snap = renderer.create(<FormError {...props} />).toJSON();
            expect(snap).toMatchSnapshot();
        });

        it("renders without issues", () => {
            expect(wrapper.exists()).toEqual(true);
        });

        it("renders Notification component", () => {
            expect(wrapper.find('withHelpersModifiers(Notification)').length).toEqual(1);
        });

        it("renders same number of li tags as number of errors", () => {
            expect(wrapper.find('withHelpersModifiers(Notification) li').length).toEqual(props.errors.length);
        });

        it("renders error message as passed in the props", () => {
            expect(wrapper.find('withHelpersModifiers(Notification) li').first().text()).toEqual(props.errors[0]);
        });

        it("renders isHidden property same as props", () => {
            expect(wrapper.find('withHelpersModifiers(Notification)').prop('isHidden')).toEqual(props.hideError);
        });

        it("renders danger color for notification", () => {
            expect(wrapper.find('withHelpersModifiers(Notification)').prop('isColor')).toEqual('danger');
        });
    })

    describe("doesn't have errors", () => {
        let props, wrapper;
        beforeAll(() => {
            props = {
                hideError : true,
                errors : []
            }
            wrapper = shallow(<FormError {...props} />);
        });

        it("matches snapshot", () => {
            const snap = renderer.create(<FormError {...props} />).toJSON();
            expect(snap).toMatchSnapshot();
        });

        it("renders without issues", () => {
            expect(wrapper.exists()).toEqual(true);
        });

        it("renders Notification component", () => {
            expect(wrapper.find('withHelpersModifiers(Notification)').length).toEqual(1);
        });

        it("doesn't render ul ", () => {
            expect(wrapper.find('withHelpersModifiers(Notification) ul').length).toEqual(0);
        });

        it("renders isHidden property same as props", () => {
            expect(wrapper.find('withHelpersModifiers(Notification)').prop('isHidden')).toEqual(props.hideError);
        });
    })
    
});