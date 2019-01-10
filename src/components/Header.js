import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Header extends Component {
  render() {
    return(
      <div className="flex pa1 justify-between nowrap blue">
        <div className="flex flex-fixed black">
          <div className="fw7 mr1">Toad's Garage</div>
          <Link to="/" className="ml1 no-underline white">
            Home
          </Link>
          <div className="ml1">|</div>
          <Link to="/create" className="ml1 no-underline white">
            Create Car
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
