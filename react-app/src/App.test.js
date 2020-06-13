import React from 'react';

import {App} from './App';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import {mount} from 'enzyme';

describe('App.jsx', () => {
  let store,initialState, wrapper;

  beforeEach (()=>{

    initialState = {
      user: {
        currentUser :{
			authenticated:false,
			name:''
        }
      },
      nextPath :  {
          nextPath: '/'
	  }
    }   
    const mockStore = configureStore();
	store = mockStore(initialState);
	
    wrapper = mount(
		<Provider store={store}>
			<MemoryRouter initialEntries={["/"]}>
				<App />
			</MemoryRouter>
		</Provider>
	);
});

  it('tests App', () => {
    expect(wrapper.find('Switch').length).toEqual(1);
    expect(wrapper.find('AppFooter').length).toEqual(1);
  })
  
});
