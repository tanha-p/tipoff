import React from "react";
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TestBrowserIcon from '../BrowserIcon';

describe("BrowserIcon", () => {

    it("matches snapshot", () => {
        const browser={
            name : 'Chrome',
            version : '79.12',
            major : '79'
        }
        const tree = renderer.create(<TestBrowserIcon browser={browser} />).toJSON();
        expect(tree).toMatchSnapshot();
    
    });
    
    it("renders without issues", () =>{
        const browser={
            name : 'Chrome',
            version : '79.12',
            major : '79'
        }
        const component = shallow(<TestBrowserIcon browser={browser} />);
        expect(component.find('.fab').hasClass('fa-chrome')).toEqual(true);
        expect(component.find('.fab').props().title).toEqual(`${browser.name}:${browser.major}`);
    });

    it("renders with default icon when browser is not passed", () => {
        const component = shallow(<TestBrowserIcon  />);
        expect(component.find('.far').hasClass('fa-window-maximize')).toEqual(true);
    })

});

