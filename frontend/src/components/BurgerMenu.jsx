import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const BurgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="burger-menu">
      <button
        className={`burger-button ${menuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </button>
      <div className={`menu-panel ${menuOpen ? 'visible' : ''}`}>
        <nav>
          <ul>
            { (localStorage.getItem("token") == null)  ? (
              <>
                <li><Link to="/sign-in" onClick={closeMenu}>Prihlásiť sa</Link></li>
                <li><Link to="/sign-up" onClick={closeMenu}>Zaregistrovať sa</Link></li>
                <li><Link to="/about-us" onClick={closeMenu}>O nás</Link></li>
                <li><Link to="/fields" onClick={closeMenu}>Ihriská</Link></li>
                <li><Link to="/contacts" onClick={closeMenu}>Kontakty</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={closeMenu}>Hlavna stranka</Link></li>
                <li><Link to="/profile" onClick={closeMenu}>Profil</Link></li>
                {/* <li><Link to="/make-reservation" onClick={closeMenu}>Rezervovať</Link></li> */}
                <li><Link to="/manage-reservations" onClick={closeMenu}>Správa rezervácií</Link></li>
                <li><Link to="/support" onClick={closeMenu}>Podpora</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BurgerMenu;
