import React from 'react';
import { shallow,mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import axios from 'axios';
import sinon from 'sinon';

import {App} from './App';
import auth from './service/auth-svc';



describe('App.jsx', () => {

  beforeEach(() => {
    
  });

  it('tests App', () => {
    const mockSetCurrentUser = () => {};
    const mockCurrentUser = {
      authenticated:true,
      name:'Test Test'
    }
    const app = shallow(<App 
      setCurrentUser={mockSetCurrentUser}
      currentUser={mockCurrentUser} />);
    expect(app.find('Switch').length).toEqual(1);
    expect(app.find('AppFooter').length).toEqual(1);
  })
  
});
