import React, { useState } from "react";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import logo from "../../logo/great-outdoors-logo_gradient.svg";
import "./authModal.scss";

const AuthModal = props => {
  const [usernameInput, setUsernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [loginToggle, setLoginToggle] = useState(true);

  const toggleLogin = () => setLoginToggle(!loginToggle);

  const login = () => {
    axios
      .post("/auth/login", { email: emailInput, password: passInput })
      .then(res => {
        props.getUser(res.data);
        props.toggleFn();
      })
      .catch(err => alert(err.response.request.response));
  };

  const register = () => {
    axios
      .post("/auth/register", {
        username: usernameInput,
        email: emailInput,
        password: passInput
      })
      .then(res => props.getUser(res.data))
      .catch(err => alert(err.response.request.response));
  };

  return (
    <div>
      <div className="auth-modal">
        <img src={logo} alt="logo" className="auth-modal-logo" />
        <button className="modal-close-btn" onClick={props.toggleFn}>
          x
        </button>
        {loginToggle ? (
          <div id="login-form">
            <hr className="login-lines" />
            <h1 className='auth-title'>Login</h1>
            <hr className="login-lines" id='login-bottom-line'/>
            <input
              className="auth-modal-input"
              value={emailInput}
              placeholder="EMAIL"
              onChange={e => setEmailInput(e.target.value)}
            />
            <input
              className="auth-modal-input"
              type="password"
              value={passInput}
              placeholder="PASSWORD"
              onChange={e => setPassInput(e.target.value)}
            />
            <button className='auth-modal-btn' onClick={login}>Login</button>
            <p className='auth-toggle-text' onClick={toggleLogin}>
              Don't have an account? Click here to create one.
            </p>
          </div>
        ) : (
          <div id="register-form">
            <hr className="login-lines" />
            <h1 className='auth-title'>Register</h1>
            <hr className="login-lines" id='login-bottom-line'/>
            <input
              className="auth-modal-input"
              value={usernameInput}
              placeholder="NAME"
              onChange={e => setUsernameInput(e.target.value)}
            />
            <input
              className="auth-modal-input"
              value={emailInput}
              placeholder="EMAIL"
              onChange={e => setEmailInput(e.target.value)}
            />
            <input
              className="auth-modal-input"
              type="password"
              value={passInput}
              placeholder="PASSWORD"
              onChange={e => setPassInput(e.target.value)}
            />
            <button className='auth-modal-btn' onClick={register}>Register</button>
            <p className='auth-toggle-text' onClick={toggleLogin}>
              Already have an account? Click here to login.
            </p>
          </div>
        )}
      </div>
      <div id="auth-background-overlay" onClick={props.toggleFn}></div>
    </div>
  );
};

export default connect(null, { getUser })(AuthModal);
