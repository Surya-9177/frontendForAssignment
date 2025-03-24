import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './index.css';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUser] = useState('');
    const [password, setPass] = useState('');
    const [errMsg, setErrMsg] = useState(''); 

    const onSubmitForm = async (event) => {
        event.preventDefault(); 
        const url = 'http://localhost:3000/register';
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
            console.log(data);
            if (response.ok){
                navigate('/login');
                setErrMsg(data)
            }else{
                setErrMsg(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='login-home-con'>
            <h2>Register</h2>
            <form className='login-card' onSubmit={onSubmitForm}>
                <label htmlFor = {username}>ENTER USERNAME</label>
                <input
                    id='username'
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUser(e.target.value)}
                    required
                />
                <br />
                <label htmlFor = {username}>ENTER PASSWORD</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    required
                />
                <br />
                <button className='login-btn b2' >Register now</button>
            </form>
            {errMsg && <p className='para'>{errMsg}</p>}
        </div>
    );
};

export default Register;