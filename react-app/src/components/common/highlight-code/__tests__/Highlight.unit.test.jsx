import React from 'react';
import {shallow} from 'enzyme';

import Highlight from '../Highlight';



describe("Highlight", () => {
    let wrapper, props;
    beforeAll(()=>{
        props = {
            code : `let temp = {key1:"val1"}`,
            language : "javascript"
        }
        wrapper = shallow(<Highlight {...props} />);
    })

    it("renders without issues", () => {
        
        expect(wrapper.exists()).toEqual(true);
    });

    it("renders React Highlight component", () => {
        expect(wrapper.find('Highlight').length).toEqual(1)
    })

    it("renders Copy button component", () => {
        expect(wrapper.find('.copy').length).toEqual(1)
    })

    it("Copy button click works as expected", () => {
        const eventMock = { preventDefault: jest.fn() };
        navigator.clipboard = { writeText: jest.fn() }
        wrapper.find('.copy').props().onClick(eventMock) ;
        expect(navigator.clipboard.writeText).toHaveBeenCalled();
        expect(wrapper.find('.copy').contains('Copied')).toEqual(true);
    })


});