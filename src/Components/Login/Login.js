import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { firebase } = useContext(FirebaseContext);

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email is required';
    } else if (!regex.test(email)) {
      return 'Please enter a valid email address';
    } else {
      return '';
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    } else {
      return '';
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setEmailError(emailError);
    setPasswordError(passwordError);

    if (!emailError && !passwordError) {
      firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        navigate('/');
      }).catch((error) => {
        // Extract the specific error message from the error object
        let errorMessage = error.message || 'An error occurred';
        
        // Check if the error message is in JSON format and extract the specific message
        try {
          const errorObj = JSON.parse(errorMessage);
          if (errorObj.error && errorObj.error.errors && errorObj.error.errors[0].message) {
            errorMessage = errorObj.error.errors[0].message;
          }
        } catch (err) {
          // If parsing fails, use the original error message
          errorMessage = error.message || 'An error occurred';
        }

        toast.error(errorMessage);
      });
    } else {
      if (emailError) {
        toast.error(emailError);
      }
      if (passwordError) {
        toast.error(passwordError);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            defaultValue=""
          />
          <br />
          {emailError && <span className="error">{emailError}</span>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            defaultValue=""
          />
          <br />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <br />
          <button>Login</button>
        </form>
        <a onClick={() => { navigate('/signup') }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
