import React from 'react';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { mount} from 'enzyme';
import renderer from 'react-test-renderer';

import {Tips}  from '../Tips';

const mockTips = {
    data: {  
        success: true,
        data: [{
            "project_id" : "ckat454uq00050nwddaqp5aaq",
            "event_type" : "info",
            "event_title" : "Fetching news with page 2",
            "created_on" : "2019-12-29T18:07:40.409Z",
            "tags" : [
                    "jobs",
                    "news",
                    "resources"
            ],
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

jest.mock('react-router-dom', () => ({
    __esModule: true,
    useRouteMatch:jest.fn().mockReturnValue({
        params : {
            id : 'ckat454uq00050nwddaqp5aaq'
        }
    }),
    useHistory :jest.fn().mockReturnValue([]),
    useLocation: jest.fn().mockReturnValue({
      pathname: '/app',
      search: '',
      hash: '',
      state: {
          projectName: 'test'
      },
      key: '5nvxpbdafa',
    }),
  }));


describe("Tips Component", () => {

    let store,initialState, wrapper;

    beforeEach (()=>{
        initialState = {
            tipsState: {
                tips: mockTips.data.data,
                page: 1,
                items: 100
            }
        }   
        const mockStore = configureStore();
        store = mockStore(initialState);
        wrapper = mount(<Provider store={store}><Tips/></Provider>);
       
    });

    it("matches snapshot", () => {
        const tree = renderer.create(<Provider store={store}><Tips/></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('calls `getTips` function', async (done) => {
            expect(wrapper.find('PageTitle').length).toEqual(1);
            expect(wrapper.find('TipsTable').length).toEqual(1);
            expect(wrapper.find('TipsTable').props().tips).toEqual(mockTips.data.data);
            done();
    });

});