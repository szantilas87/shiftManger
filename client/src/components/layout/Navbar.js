import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import OrganizationContext from '../../context/organization/organizationContext';
import ShiftContext from '../../context/shift/shiftContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const organizationContext = useContext(OrganizationContext);
  const shiftContext = useContext(ShiftContext);

  const {
    isAuthenticated,
    logout,
    user,
    edit,
    editUser,
    leaveEditUser
  } = authContext;
  const { clearOrganizations } = organizationContext;
  const { clearShifts } = shiftContext;

  const onLogout = () => {
    logout();
    clearOrganizations();
    clearShifts();
  };

  const onEdit = () => {
    editUser();
  };

  const leaveEdit = () => {
    leaveEditUser();
  };

  const authLinks = (
    <Fragment>
      <ul>
        <li> Hello {user && user.name} </li>{' '}
        {!edit ? (
          <li>
            <Link to='/account' onClick={onEdit}>
              Edit Account{' '}
            </Link>{' '}
          </li>
        ) : (
          <li>
            <Link to='/' onClick={leaveEdit}>
              Home{' '}
            </Link>{' '}
          </li>
        )}{' '}
        <li>
          <Link to='/login'>
            <a onClick={onLogout} href='#!'>
              <i className='fas fa-sign-out-alt'> </i>{' '}
              <span className='hide-sm'> Logout </span>{' '}
            </a>{' '}
          </Link>
        </li>{' '}
      </ul>{' '}
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/register'> Register </Link>{' '}
      </li>{' '}
      <li>
        <Link to='/login'> Login </Link>{' '}
      </li>{' '}
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <Link to='/' onClick={leaveEdit}>
        <h1>
          <i className={icon}> </i> {title}{' '}
        </h1>{' '}
      </Link>{' '}
      <ul> {isAuthenticated ? authLinks : guestLinks} </ul>{' '}
    </div>
  );
};

Navbar.prototype = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
};

export default Navbar;
