import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config"
import { useDispatch } from 'react-redux';
import { setUser } from '../store/usersSlice.js';

export default function Header() {
  
  const dispatch = useDispatch();

  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut(auth).then(() => {
        dispatch(setUser(null));
      }).catch((error) => {
        console.log(error)
      });
    }
  }

  return (
    <div>
      <button onClick={handleSignOut}>Log Out</button>
    </div>
  )
}
