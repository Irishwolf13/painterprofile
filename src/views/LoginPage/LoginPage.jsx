import React, { useState } from 'react';
import { auth } from '../../firebase/config.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/usersSlice.js';
import FullPageLoader from '../../components/FullPageLoader/FullPageLoader.jsx';

export default function LoginPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState('login');
  const [error, setError] = useState('')
  const [userCredentials, setUserCredentials] = useState({})
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser({id: user.uid, email: user.email}));
    } else {
      dispatch(setUser(null));
    }
    if (isLoading) {setIsLoading(false)};
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    setError('');
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        // This wants to be empty, as we don't need to run anything here.
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  const handleLogIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
    .then((userCredential) => {
      // This wants to be empty, as we don't need to run anything here.
    })
    .catch((error) => {
      setError(error.message);
    });
  }

  const handleCredentials = (e) => {
    setUserCredentials({...userCredentials, [e.target.name]: e.target.value})
  }

  return (
    <div>
      {isLoading && <FullPageLoader />}
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name='email'
            placeholder='Enter Email'
            onChange={(e) => {handleCredentials(e)}}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name='password'
            placeholder='Enter Password'
            onChange={(e) => {handleCredentials(e)}}
          />
        </div>
        <button type="submit" onClick={(e) => {handleSignUp(e)}}>SignUp</button>
        <button type="submit" onClick={(e) => {handleLogIn(e)}}>LogIn</button>
      </form>
      {error && 
        <div>{error}</div>
      }
    </div>
  );
}
