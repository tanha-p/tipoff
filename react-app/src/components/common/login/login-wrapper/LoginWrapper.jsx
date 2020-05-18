import React, { useState } from 'react';
import {
    Hero,
    HeroBody,
    Container,
    Columns,
    Column,
    TabList,
    TabLink,
    Tabs,
    Tab,
    HeroHeader
} from 'bloomer';

import LoginForm from '../login-form/LoginForm';
import RegistrationForm from '../registration-form/RegistrationForm';
import {TabContentRenderer} from '../../tab-content-renderer/TabContentRenderer';

import './LoginWrapper.css';

const LoginWrapper = () => {

    const [state,setState] = useState({
        tab:"login",
        active:"login",
        tabs :{
            login : LoginForm,
            registration: RegistrationForm
        }
    });

    const handleTab = evt => {
        setState({
            ...state,
            active: evt.currentTarget.dataset.id,
            tab: evt.currentTarget.dataset.id
        });
    };
    
    return (
        <Hero isFullHeight >
            <HeroHeader>
            </HeroHeader>
            <HeroBody >
                <Container hasTextAlign='centered'>
                <Columns isCentered>
                    <Column isSize="1/2">
                        <Tabs >
                            
                                <TabList >
                                    <Tab  isActive={state.active === "login"} 
                                        data-id="login"
                                        onClick={e => handleTab(e)}
                                    >
                                        <TabLink>
                                            <span>Login</span>
                                        </TabLink>
                                    </Tab>
                                    <Tab isActive={state.active === "registration"}
                                        data-id="registration"
                                        onClick={e => handleTab(e)}
                                    >
                                        <TabLink>
                                            <span>Registration</span>
                                        </TabLink>
                                    </Tab> 
                                </TabList>
                                <hr/>
                            
                        
                        </Tabs>
                        
                        <TabContentRenderer tabs={state.tabs} tab={state.tab} />
                    </Column>
                </Columns>
                    
                </Container>
            </HeroBody>
        </Hero>
    )
    
}

export default LoginWrapper;
