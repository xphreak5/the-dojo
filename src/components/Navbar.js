import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from "../assets/temple.svg"
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from "../hooks/useLogout"

import "./Navbar.css"

const Navbar = () => {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className='navbar'>
      <ul>
        <li className="logo">
          <img src={NavLogo} alt="dojo-logo" />
          <span>The Dojo</span>
        </li>
        <div className="bttns">
          {user && 
          <>
            {!isPending && <button className='btn' onClick={logout}>Logout</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
          </>
          }
          {!user && (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
          
        </div>
        
      </ul>
    </div>
  );
}

export default Navbar;
