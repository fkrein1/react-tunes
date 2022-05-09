import React from 'react';
import { Link } from 'react-router-dom';


class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="headerOne">
          <img src={`${process.env.PUBLIC_URL}/logo.png`} />
        </div>
        <div className="headerTwo">
          <Link to="/">Search</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </header>
    );
  }
}

export default Header;
