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

const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        userId : '',
        password : '',
        hideError : true,
        errors : []
    });

    const login = async (e) => {
        e.preventDefault();
        //reset err msg
        setForm({
            ...form,
            hideError: true,
            errors : []
        });
        
        //create payload to post
        const payload = {
            userId : form.userId,
            password: form.password
        }
		axios.post(`/api/v1/auth/login`, payload).then(loginSuccess,loginFailure);
    }

    const loginSuccess = resp => {
        if(resp && resp.data && resp.data.success 
            && resp.data.data.validUser){
            //user authenticated
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

    const loginFailure = err => {
        if (err.response.status === 401) {
            setForm({
                ...form,
                hideError : false,
                errors : ["Either Email or Password is incorrect."]
            });
        } else if(err.response.status === 422){
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
                    }
                    msgs.push(`${param} ${item.msg}`)
                }
            } else {
                msgs.push("Unprocessable entity")
            }
            setForm({
                ...form,
                hideError: false,
                errors : msgs
            });
            
        } else {
            setForm({
                ...form,
                hideError: false,
                errors : ["An error occured while fulfilling the request."]
            });
        }
        
    }

    const change = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }
    
    return (
        <div>
            <Box className="login-box" >
                <FormError hideError={form.hideError} errors={form.errors} />
                <Field isHorizontal>
                    <FieldBody>
                        <Field>
                            <Control>
                                <Input type="text" placeholder='Email' 
                                    name="userId" onChange={e => change(e)} 
                                    value={form.userId} />
                            </Control>
                        </Field>
                    </FieldBody>
                </Field>
                <Field isHorizontal>
                    <FieldBody>
                        <Field>
                            <Control>
                                <Input type="password" placeholder='Password' 
                                    name="password" onChange={e => change(e)} 
                                    value={form.password} />
                            </Control>
                        </Field>
                    </FieldBody>
                </Field>
                <Button isSize="large" isFullWidth className="login-btn" onClick={login}>
                    <Label hasTextColor="white">Login <Icon className="fas fa-sign-in-alt" style={{"marginLeft":".1em"}}/></Label> 
                </Button>
            </Box>
        </div>
    );
}

export default LoginForm;
