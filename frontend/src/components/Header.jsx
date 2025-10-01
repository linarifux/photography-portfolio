import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for page navigation

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to="/" className="nav-logo" onClick={closeMenu}>
          JD Photography
        </NavLink>
        
        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink to="/portfolio" className="nav-link" onClick={closeMenu}>
              Portfolio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" onClick={closeMenu}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link" onClick={closeMenu}>
              Contact
            </NavLink>
          </li>
        </ul>
        
        <div 
          className={isMenuOpen ? 'hamburger active' : 'hamburger'} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;