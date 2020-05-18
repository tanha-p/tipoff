import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { 
    Navbar, 
    NavbarStart,
    NavbarBrand, 
    NavbarBurger, 
    NavbarMenu, 
    NavbarItem, 
    Icon,
    NavbarEnd,
    Field,
    Control,
    Button
 } from 'bloomer';

import auth from '../../../service/auth-svc';
import {USER_SIGN_OUT} from '../../../redux/user/user-constants';
import {selectCurrentUser} from '../../../redux/user/user-selectors';

import './Header.css';
const Header = () => {

    const history = useHistory();
    const currentUser = useSelector(selectCurrentUser, shallowEqual);
    const dispatch = useDispatch();

    const [state,setState] = useState({ 
        isActive: false, 
        isDropdownOpen: false
    });

    const onClickNav = (e) => {
        e.preventDefault();
        setState({
            ...state,
            isActive: !state.isActive, 
            isDropdownOpen: false
        });
    }

    const signOut = (e) => {
        e.preventDefault();
        dispatch({type:USER_SIGN_OUT})
        auth.logout(() => {
            history.push("/");
        });
    }

    const navigateToHome = (e) => {
        e.preventDefault();
        history.push("/app");
    }
    
    return (
        <Navbar className="header" >
            <NavbarBrand>
                <NavbarItem className="logo" onClick={e=>(navigateToHome(e))} >
                    <Icon className='fas fa-dove' /> 
                </NavbarItem>
                <NavbarItem className="logo-text" onClick={e=>(navigateToHome(e))}>
                    Tipoff
                </NavbarItem>
                <NavbarBurger isHidden={!currentUser.authenticated} isActive={state.isActive} onClick={(e) => onClickNav(e)} />
            </NavbarBrand>
            <NavbarMenu isHidden={!currentUser.authenticated} isActive={state.isActive} onClick={(e) => onClickNav(e)}>
                <NavbarStart></NavbarStart>
                <NavbarEnd>
                    <NavbarItem className="user-name" isHidden='touch'>
                        <Icon className='fas fa-user' />  <span >{currentUser.name}</span>
                    </NavbarItem>
                    <NavbarItem>
                        <Field isGrouped>
                            <Control>
                                <Button className="sign-out-btn" onClick={(e) => signOut(e)}>
                                    <Icon className='fas fa-power-off' /> 
                                    <span>Sign Out</span>
                                </Button>
                            </Control>
                        </Field>
                    </NavbarItem>
                </NavbarEnd>
            </NavbarMenu>
        </Navbar>
    );
    
} 
	
export default Header;