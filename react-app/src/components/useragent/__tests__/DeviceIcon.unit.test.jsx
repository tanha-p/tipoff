import React from "react";
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import TestDeviceIcon from '../DeviceIcon';

describe("DeviceIcon", () => {

    it("matches snapshot", () => {
        const device = {
            type : 'mobile',
            name : 'S8',
            vendor : 'samsung'
        }
        const tree = renderer.create(<TestDeviceIcon device={device} />).toJSON();
        expect(tree).toMatchSnapshot();
    
    });
    
    it("renders without issues", () =>{
        const device = {
            type : 'mobile',
            name : 'S8',
            vendor : 'samsung'
        }
        const component = shallow(<TestDeviceIcon device={device} />);
        expect(component.find('.fas').hasClass('fa-mobile')).toEqual(true);
        expect(component.find('.fas').props().title)
            .toEqual(`${device.type}:${device.name}:${device.vendor}`);
    });

    it("renders with default icon when browser is not passed", () => {
        const component = shallow(<TestDeviceIcon  />);
        expect(component.find('.fas').hasClass('fa-laptop')).toEqual(true);
    })

});
