import React from 'react';
import { Route, Switch, Redirect, useHistory} from 'react-router-dom';
import {  useDispatch } from 'react-redux'; 

import AppFooter from './components/common/footer/AppFooter';
import ProtectedRoute from './components/common/protected-route/ProtectedRoute';
import Projects from './components/projects/projects/Projects';
import Tips from './components/tips/tips/Tips';
import TipView from './components/tips/tip-view/TipView';
import AddEditProject from './components/projects/add-edit-project/AddEditProject';
import SetupGuide from './components/setup-guide/SetupGuide';
import LoginWrapper from './components/common/login/login-wrapper/LoginWrapper';
import auth from './service/auth-svc';
import {setCurrentUser} from './redux/user/user-actions';
import {setNextPath} from './redux/next-path/next-path-actions';
import {selectCurrentUser} from './redux/user/user-selectors';
import Header from './components/common/header/Header';
import { useSelector, shallowEqual } from 'react-redux';

import './App.css';

export const App = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	
	if(history.location.pathname !== '/') {
		dispatch(setNextPath(history.location.pathname));
	}

	const currentUser = useSelector(selectCurrentUser, shallowEqual);
	
	dispatch(setCurrentUser({
		name: auth.getUser() && auth.getUser().length ? auth.getUser() : '',
		authenticated: auth.isAuthenticated()
	}));

	return (
		<div className="App">
			<Header />
			<Switch>
				<Route exact path="/" >
					{
						currentUser.authenticated === true 
							? <Redirect to="/app" /> 
							: <LoginWrapper />
					}
				</Route>
				<ProtectedRoute exact path="/tip/:id" component={TipView} />
				<ProtectedRoute exact path="/app" component={Projects}  />
				<ProtectedRoute exact path="/project/:id?" component={AddEditProject}  />
				<ProtectedRoute exact path="/setup/:id" component={SetupGuide}  />
				<ProtectedRoute exact path="/tips/:id" component={Tips}  />
			</Switch>
			<AppFooter></AppFooter>
		</div>
	)
	
}

export default App;
