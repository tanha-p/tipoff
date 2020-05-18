import React from 'react';
import {shallow} from 'enzyme';
import axios from 'axios';
import renderer from 'react-test-renderer';


import {Tips}  from '../Tips';
import TipsTable from '../../tips-table/TipsTable';

const mockTips = {
    data: {  
        success: true,
        data: [{
        
            "project_id" : "IotWorx",
            "event_type" : "info",
            "event_title" : "Fetching news with page 2",
            "created_on" : "2019-12-29T18:07:40.409Z",
            "note" : "Bedfordshire Small",
            "tags" : [
                    "jobs",
                    "news",
                    "resources"
            ],
            "user" : {
                    "user_id" : "Yessenia.Jenkins@gmail.com"
            },
            "user_agent" : {
                    "ua" : "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:68.0) Gecko/20100101 Firefox/68.0",
                    "browser" : {
                            "name" : "Firefox",
                            "version" : "68.0",
                            "major" : "68"
                    },
                    "engine" : {
                            "name" : "Gecko",
                            "version" : "68.0"
                    },
                    "os" : {
                            "name" : "Windows",
                            "version" : "10"
                    },
                    "cpu" : {
                            "architecture" : "amd64"
                    }
            },
            "tip_id" : "ck5bgpv300000i95u4gxogtp9",
            "__v" : 0
        }]
    }
};


describe("Tips Component", () => {

    const tipsState = {
        tips: mockTips.data.data,
        page: 1,
        items: 100
    }

    const setTips = () => {}

    beforeEach(() => {
        axios.get.mockImplementationOnce(() =>
            Promise.resolve(mockTips)
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("matches snapshot", () => {
        const tree = renderer.create(<Tips tipsState={tipsState} setTips={setTips} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls `getTips` function', async (done) => {
        const tips = shallow (<Tips tipsState={tipsState} setTips={setTips}/>);
        tips.instance().componentDidMount().then(() => {
            expect(axios.get).toHaveBeenCalled();
            expect(tips.find('PageTitle').length).toEqual(1);
            expect(tips.find('TipsTable').length).toEqual(1);
            expect(tips.find('TipsTable').props().tips).toEqual(mockTips.data.data);
            done();
        });
    });

});