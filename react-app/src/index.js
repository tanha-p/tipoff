import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import axios from 'axios';

import App from './App';
import store from './redux/store';
import auth from './service/auth-svc';


import 'bulma/css/bulma.css';
import './index.css';



/**
 * Add 403 Forbidden interceptor for axios
 * This interceptor will intercept all responses with status code 403
 * and redirect back to login page
 */
axios.interceptors.response.use( (response) => {
    return response;
},  (error) => {
    if (error && error.response && error.response.status === 403  ) {
        auth.logout(() => {
            window.location = '/';
        });
    } else {
        return Promise.reject(error);
    }
});


ReactDOM.render(
    <Provider store={store} >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);


