import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import UserAgentMini from '../UserAgentMini';


describe("UserAgentMini", () => {
    const ua = {
        ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
        browser: { name: 'Chrome', version: '79.0.3945.88', major: '79' },
        engine: { name: 'Blink', version: '79.0.3945.88' },
        os: { name: 'Windows', version: '10' },
        device: { vendor: undefined, model: undefined, type: undefined },
        cpu: { architecture: 'amd64' }
    }

    const wrapper = shallow(<UserAgentMini ua={ua} />);

    it("matches snapshot", () => {
        const snap = renderer.create(<UserAgentMini ua={ua} />).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("renders browser icon", () => {
        expect(wrapper.find('BrowserIcon').exists()).toEqual(true);
    });

    it("renders os icon", () => {
        expect(wrapper.find('OsIcon').exists()).toEqual(true);
    });

    it("renders device icon", () => {
        expect(wrapper.find('DeviceIcon').exists()).toEqual(true);
    });
});