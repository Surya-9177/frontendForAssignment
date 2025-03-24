import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import './index.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [errMsg, setErrMsg] = useState(''); 

    const onSubmitSuccess = jwtToken => {
        Cookies.set('jwt_token', jwtToken, {expires: 30});
        navigate('/dashboard');
        console.log(jwtToken)
    }

    const onSubmitFailure = errMsg => {
        setErrMsg(errMsg);
    }

    const onSubmitForm = async (event) => {
        event.preventDefault(); 
        const url = 'http://localhost:3000/login';
        const opt = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }),
        };

        try {
            const response = await fetch(url, opt);
            const data = await response.json();
            //console.log(data.jwt_token);
            //console.log(data)
            
            if (response.ok) {
                onSubmitSuccess(data.jwtToken);
            } else {
                onSubmitFailure(data);
            }
        } catch (error) {
            setErrMsg(error);
            console.log(error);
        }
    };

    return (
        <div className='login-home-con'>
            <h2>Login</h2>
            <form className='login-card' onSubmit={onSubmitForm}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />
                <br />
                <button className='login-btn' type="submit">Login</button>
            </form>
            {errMsg && <p>{errMsg}</p>}

            <div>
                <h1 className='login-acnt-des' >Don't have account register now</h1>
                <Link to ='/register-now' >
                  <button className='login-btn b2' >Register now</button>
                </Link>
            </div>
        </div>
    );
};

export default Login;