import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';

import TipsTable from '../TipsTable';

import TestUtils from '../../../../../../api-server/utils/test-utils';


describe("TipsTable", () => {

    const mockTips = TestUtils.getFakeTips(10,true);

    const props = {
        tips : mockTips
    }
    const wrapper = shallow(<TipsTable {...props} />);
    const rows = wrapper.find('.tip-row');

    it("matches snapshot", () => {
        const snap = renderer.create(<TipsTable />).toJSON();
        expect(snap).toMatchSnapshot();
    });

    it("renders without issues", () => {
        expect(wrapper.exists()).toEqual(true);
    });

    it("renders rows to match the number of tips ", () => {
        expect(rows.length).toEqual(mockTips.length);
    });

    it("renders td values to match the tip ", () => {
        const firstRowColumns = rows.first().find('td');
        let cols = firstRowColumns.map(col => {
            return col.html()
        });
        expect(firstRowColumns.length).toEqual(6);
        expect(cols[0]).toEqual(`<td>${mockTips[0].event_type}</td>`);
        expect(cols[1]).toContain('<time');
        expect(cols[2]).toEqual(`<td>${mockTips[0].event_title}</td>`);
        expect(cols[3]).toContain(`tag`);
        expect(cols[4]).toContain(`icon`);
        expect(cols[5]).toEqual(`<td>${mockTips[0].user.user_id}</td>`);
        
    });
});  
 