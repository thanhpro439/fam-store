import React, { useState } from 'react';
import './CSS/LoginSignUp.css';
import axios from 'axios';

function LoginSignup(props) {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const changeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    let resData;
    // await fetch('https://famstorebackend.onrender.com/login', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/form-data',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => (resData = data));

    try {
      const response = await axios.post(
        '/https://backend-lpgv.onrender.com/apiusers/login',
        formData,
        {
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
        }
      );

      resData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    if (resData.success) {
      localStorage.setItem('auth-token', resData.token);
      window.location.replace('/');
    } else {
      alert(resData.error);
    }
  };

  const signup = async () => {
    let resData;
    // await fetch('https://famstorebackend.onrender.com/signup', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/form-data',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => (resData = data));

    try {
      const response = await axios.post(
        'https://backend-lpgv.onrender.com/api/users/signup',
        formData,
        {
          headers: {
            Accept: 'application/form-data',
            'Content-Type': 'application/json',
          },
        }
      );

      resData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    if (resData.success) {
      localStorage.setItem('auth-token', resData.token);
      window.location.replace('/');
    } else {
      alert(resData.error);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>

        <div className="loginsignup-field">
          {state === 'Sign Up' ? (
            <input
              type="text"
              placeholder="Your Name"
              name="username"
              value={formData.username}
              onChange={(e) => {
                changeHandle(e);
              }}
            />
          ) : (
            <></>
          )}
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={(e) => {
              changeHandle(e);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={(e) => {
              changeHandle(e);
            }}
          />
        </div>

        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        <button
          onClick={() => {
            state === 'Sign Up' ? signup() : login();
          }}
        >
          Continue
        </button>

        {state === 'Sign Up' ? (
          <p className="loginsignup-login">
            Aready have an account?{' '}
            <span
              onClick={() => {
                setState('Login');
                window.scroll({
                  top: 100,
                  behavior: 'smooth',
                });
              }}
            >
              Login here!
            </span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{' '}
            <span
              onClick={() => {
                setState('Sign Up');
                window.scroll({
                  top: 100,
                  behavior: 'smooth',
                });
              }}
            >
              Create here!
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;
