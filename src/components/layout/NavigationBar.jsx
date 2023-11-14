import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.scss'

function NavBar() {
  return (
    <nav className='navBar'>
      <Link to="/">Accueil</Link>
      <Link to="/current-employees">Liste des employés</Link>
    </nav>
  );
}

export default NavBar;
