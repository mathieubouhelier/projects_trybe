import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { saveUserEmail } from '../actions/index';
import './Login.css';

const Login = ({ saveMail }) => {
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState('');

  const checkEmail = (value) => {
    setEmail(value);
    const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
    return value.match(regexEmail) ? setValidEmail(true) : setValidEmail(false);
  };

  const checkPassword = (pass) => (
    pass.length > 5 ? setValidPassword(true) : setValidPassword(false)
  );

  const handleLogin = () => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email }));
    saveMail(email);
  };

  // useEffect(() => 

  // document.body.style.backgroundColor= '#37b9e6',

  // );

  return (
    <div className="login-container">
      <div className="simple-login-container">
        <h2>Login</h2>
        <div className="row">
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="email"
              data-testid="email-input"
              placeholder="Email"
              onChange={(event) => checkEmail(event.target.value)}
            />
            {!validEmail && <small id="emailHelp" class="form-text text-muted">Please enter a valid email address.</small>}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 form-group">
            <input
              className="form-control"
              type="password"
              data-testid="password-input"
              placeholder="Senha"
              onChange={(event) => checkPassword(event.target.value)}
            />
            {!validPassword && <small id="emailHelp" class="form-text text-muted">the password must be at least 6 characters long.</small>}

          </div>
        </div>
        <div className="row">
          <div className="col-md-12 form-group">
            <Link to="/comidas">
              <button
                type="button"
                className="btn btn-block btn-login"
                data-testid="login-submit-btn"
                disabled={!validEmail || !validPassword}
                onClick={() => handleLogin()}
              >
                Entrar
        </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  saveMail: (payload) => dispatch(saveUserEmail(payload)),
});

Login.propTypes = {
  saveMail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
