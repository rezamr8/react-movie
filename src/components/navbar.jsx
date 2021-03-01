import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link className='navbar-brand' to='/'>
          Navbar
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <NavLink className='nav-item nav-link ' to='/movies'>
              Movies <span className='sr-only'>(current)</span>
            </NavLink>
            <NavLink className='nav-item nav-link' to='/customers'>
              customers
            </NavLink>
            <NavLink className='nav-item nav-link' to='/rentals'>
              rentals
            </NavLink>
            {user && (
              <React.Fragment>
                <NavLink className='nav-item nav-link' to='/profile'>
                  {user.name}
                </NavLink>
                <NavLink className='nav-item nav-link' to='/logout'>
                  Logout
                </NavLink>
              </React.Fragment>
            )}
            {!user && (
              <React.Fragment>
                <NavLink className='nav-item nav-link' to='/login'>
                  Login
                </NavLink>
                <NavLink className='nav-item nav-link' to='/register'>
                  Register
                </NavLink>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
