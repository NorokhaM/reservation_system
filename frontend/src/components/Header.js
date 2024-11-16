import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1>SportBook</h1>
    <nav>
      <Link to="/signin" className="nav-button">Sign In</Link>
      <Link to="/signup" className="nav-button">Sign Up</Link>
    </nav>
  </header>
);

export default Header;