import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const { firebase } = useContext(FirebaseContext);

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateUsername = (username) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!username) {
      return 'Username is required';
    } else if (!regex.test(username)) {
      return 'Username can only contain alphabets and spaces';
    } else {
      return '';
    }
  };

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

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    if (!phone) {
      return 'Phone number is required';
    } else if (!regex.test(phone)) {
      return 'Phone number must be exactly 10 digits';
    } else {
      return '';
    }
  };

  const validatePassword = (password) => {
    if (!password) {
      return 'Password is required';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    } else {
      return '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);
    const passwordError = validatePassword(password);

    setUsernameError(usernameError);
    setEmailError(emailError);
    setPhoneError(phoneError);
    setPasswordError(passwordError);

    if (!usernameError && !emailError && !phoneError && !passwordError) {
      firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
        result.user.updateProfile({ displayName: username }).then(() => {
          firebase.firestore().collection('users').add({
            id: result.user.uid,
            username: username,
            phone: phone,
          }).then(() => {
            navigate("/login");
          }).catch((error) => {
            toast.error(error.message);
          });
        }).catch((error) => {
          toast.error(error.message);
        });
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
      if (usernameError) {
        toast.error(usernameError);
      }
      if (emailError) {
        toast.error(emailError);
      }
      if (phoneError) {
        toast.error(phoneError);
      }
      if (passwordError) {
        toast.error(passwordError);
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => { setUsername(e.target.value) }}
            id="fname"
            name="name"
            defaultValue=""
          />
          <br />
          {usernameError && <span className="error">{usernameError}</span>}
          <br />
          <label htmlFor="lname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            id="fname"
            name="email"
            defaultValue=""
          />
          <br />
          {emailError && <span className="error">{emailError}</span>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => { setPhone(e.target.value) }}
            id="lname"
            name="phone"
            defaultValue=""
          />
          <br />
          {phoneError && <span className="error">{phoneError}</span>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
            id="lname"
            name="password"
            defaultValue=""
          />
          <br />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link className="loginTo" to={'/login'}>Login</Link>
      </div>
    </div>
  );
}
