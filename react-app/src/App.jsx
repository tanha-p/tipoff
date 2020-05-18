import React, { Component } from 'react';
import { Route, Switch, Redirect} from 'react-router-dom';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

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
import {selectCurrentUser} from './redux/user/user-selectors';
import Header from './components/common/header/Header';

import './App.css';

export class App extends Component {
	constructor(props){
		super(props);
		//set User with the userName and authenticated flag
		this.props.setCurrentUser ({
			name: auth.getUser() && auth.getUser().length ? auth.getUser() : '',
			authenticated: auth.isAuthenticated()
		});
	}

	render() {
		const { currentUser } = this.props;
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
					<Route exact path="/technologies" component={TechStack}  />
				</Switch>
				<AppFooter></AppFooter>
			</div>
		);
	}
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser : user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps,mapDispatchToProps)(App) ;
