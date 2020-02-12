import React, {useState} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../../redux/userReducer';
import axios from 'axios';

const AuthModal = props => {
    const [usernameInput, setUsernameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passInput, setPassInput] = useState('');
    const [loginToggle, setLoginToggle] = useState(true);

    const toggleLogin = () => setLoginToggle(!loginToggle);

    const login = () => {
        axios.post('/auth/login', {email: emailInput, password: passInput})
        .then(res => {
            console.log(res.data)
            props.getUser(res.data)
            props.toggleFn()
        })
        .catch(err => alert(err.response.request.response))
    }

    const register = () => {
        axios.post('/auth/register', {username: usernameInput, email: emailInput, password: passInput})
        .then(res => props.getUser(res.data))
        .catch(err => alert(err.response.request.response))
    }

    return (
        <div className='auth-modal'>
            <button className="modal-close-btn" onClick={props.toggleFn}>x</button>
            {loginToggle ? (
                <div id='login-form'>
                    <h1>Sign In</h1>
                    <input
                        value={emailInput}
                        placeholder='Email'
                        onChange={(e) => setEmailInput(e.target.value)} />
                    <input
                        type='password'
                        value={passInput}
                        placeholder='Password'
                        onChange={(e) => setPassInput(e.target.value)} />
                    <button onClick={login} >Login</button>
                    <p onClick={toggleLogin}>Don't have an account? Click here to create one.</p>
                </div>
            ) : (
                <div id='register-form'>
                    <h1>Register</h1>
                    <input
                        value={usernameInput}
                        placeholder='Name'
                        onChange={(e) => setUsernameInput(e.target.value)} />
                    <input
                        value={emailInput}
                        placeholder='Email'
                        onChange={(e) => setEmailInput(e.target.value)} />
                    <input
                        type='password'
                        value={passInput}
                        placeholder='Password'
                        onChange={(e) => setPassInput(e.target.value)} />
                    <button onClick={register}>Register</button>
                    <p onClick={toggleLogin}>Already have an account? Click here to login.</p>  
                </div> 
            )}
        </div>
    )
}

export default connect(null, {getUser})(AuthModal);