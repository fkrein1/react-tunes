import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link to="/">Pesquisa</Link>
        <Link to="/favorites">Favoritas</Link>
      </header>
    );
  }
}

export default Header;
