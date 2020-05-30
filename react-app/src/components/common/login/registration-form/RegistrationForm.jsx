import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import axios from 'axios';
import {
    Box,
    Field,
    Label,
    Control,
    Input,
    Button,
    Icon,
    FieldBody, 
} from 'bloomer';

import FormError from '../../form-error/FormError';
import auth from '../../../../service/auth-svc';
import {setCurrentUser} from '../../../../redux/user/user-actions';

export const RegistrationForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [state,setState] = useState({
        userId : '',
        name: '',
        password : '',
        confirmPassword: '',
        hideError : true,
        errors : []
    });

    const register = async (e) => {
        e.preventDefault();
        //reset err msg
        setState({
            ...state,
            hideError : true,
            errors : []
        });
        //create payload to post
        const payload = {
            userId : state.userId,
            name : state.name,
            password: state.password,
            confirmPassword : state.confirmPassword,
        }
		axios.post(`/api/v1/auth/register`, payload).then(registerSuccess,registerError);
    }

    const registerSuccess = resp => {
        if(resp && resp.data && resp.data.success){
            //user created
            let token = resp.data.data.token;
            let user = resp.data.data.user;
            /**
             * Redirect user to homepage after logging in
             */
            auth.login(token, user, () => {
                //Set the user into the global state
                
                dispatch(setCurrentUser({
                    name: user.name,
                    authenticated: true
                }))
                history.push("/app");
            })
        }
    }

    const registerError = err => {
        if(err.response.status === 422){
            let msgs = [];
            if(err.response.data && err.response.data.data
                    && err.response.data.data.err){
                for(let i = 0 ; i < err.response.data.data.err.length ; i++){
                    let item = err.response.data.data.err[i];
                    
                    let param = '';
                    if(item.param === 'userId'){
                       param = 'Email'
                    } else if(item.param === 'password'){
                        param = 'Password'
                    } else if(item.param === 'name'){
                        param = 'Name'
                    } else if(item.param === 'confirmPassword'){
                        param = 'Confirm Password'
                    }
                    msgs.push(`${param} ${item.msg}`)
                }
            } else {
                msgs.push("Unprocessable entity")
            }
            setState({
                ...state,
                hideError : false,
                errors : msgs
            });
            
        } else if(err.response.status === 409){
            setState({
                ...state,
                hideError : false,
                errors : ["A user with this email already exists. Please use Login."]
            });
        } else {
            setState({
                ...state,
                hideError : false,
                errors : ["An error occured while fulfilling the request."]
            });
        }
        
    }

    const change = e => {
        setState({
            ...state,
            [e.target.name] : e.target.value
        });
    }
    
    return (
        <div>
            
            <Box className="login-box" >
                <FormError hideError={state.hideError} errors={state.errors} />
                <Field isHorizontal>
                    <FieldBody>
                        <Field>
                            <Control>
                                <Input type="text" placeholder='Email' name="userId"
                                    onChange={e => change(e)} 
                                    value={state.userId} />
                            </Control>
                        </Field>
                    </FieldBody>
                </Field>
                <Field isHorizontal>
                    <FieldBody>
                        <Field>
                            <Control>
                                <Input type="text" placeholder='Name' name="name" 
                                    onChange={e => change(e)} 
                                    value={state.name} />
                            </Control>
                        </Field>
                    </FieldBody>
                </Field>
                <Field isHorizontal>
                    <FieldBody>
                        <Field>
                            <Control>
                                <Input type="password" placeholder='Password' name="password"
                                    onChange={e => change(e)} 
                                    value={state.password} />
                            </Control>
                        </Field>
                    </FieldBody>
                </Field>
                <Field isHorizontal>
                    <FieldBody>
                        <Field>
                            <Control>
                                <Input type="password" placeholder='Confirm Password' name="confirmPassword" 
                                    onChange={e => change(e)} 
                                    value={state.confirmPassword} />
                            </Control>
                        </Field>
                    </FieldBody>
                </Field>
                <Button isSize="large" isFullWidth className="login-btn" onClick={(e) => register(e)}>
                    <Label hasTextColor="white">Register <Icon className="fas fa-sign-in-alt" style={{"marginLeft":".1em"}}/></Label> 
                </Button>
            </Box>
        </div>
    )
}

export default RegistrationForm;
