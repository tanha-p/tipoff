import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import { Container } from 'bloomer';

import {selectCurrentUser} from '../../../redux/user/user-selectors';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const currentUser = useSelector(selectCurrentUser, shallowEqual);
    return (
        <Route 
            {...rest} 
            render={
                (props) => {
                    if (currentUser.authenticated) {
                        return (
                            <div>
                                <Container isFluid id="app-container">
                                    <div style={{padding:'1em 0em'}}>
                                        <Component {...props} />
                                    </div>
                                </Container>
                            </div>
                        )
                    } else {
                        return <Redirect exact to="/" />
                    }
                }
            }
        />
    )
}

export default ProtectedRoute;
