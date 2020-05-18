import React from "react";
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TestOsIcon from '../OsIcon';

describe("OsIcon", () => {

    it("matches snapshot", () => {
        const os = {
            name : 'Windows',
            version : '10'
        }
        const tree = renderer.create(<TestOsIcon os={os} />).toJSON();
        expect(tree).toMatchSnapshot();
    
    });
    
    it("renders without issues", () =>{
        const os = {
            name : 'Windows',
            version : '10'
        }
        const component = shallow(<TestOsIcon os={os} />);
        expect(component.find('.fab').hasClass('fa-windows')).toEqual(true);
        expect(component.find('.fab').props().title)
            .toEqual(`${os.name}:${os.version}`);
    });

    it("renders with default icon when browser is not passed", () => {
        const component = shallow(<TestOsIcon  />);
        expect(component.find('.far').hasClass('fa-window-maximize')).toEqual(true);
    })

});
