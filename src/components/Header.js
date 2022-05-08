import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.css';


class Header extends React.Component {
  render() {
    return (
      <header>
        <div className={ style.headerOne }>
          <img src="../assets/logo.png"/>
        </div>
        <div className={ style.headerTwo }>
          <Link to="/">Pesquisa</Link>
          <Link to="/favorites">Favoritas</Link>
        </div>
      </header>
    );
  }
}

export default Header;
