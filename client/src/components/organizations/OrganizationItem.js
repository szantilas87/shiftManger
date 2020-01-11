import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import OrganizationContext from '../../context/organization/organizationContext';
import AuthContext from '../../context/auth/authContext';
import ShiftContext from '../../context/shift/shiftContext';
import { Link } from 'react-router-dom';

const OrganizationItem = ({ organization }) => {
  const organizationContext = useContext(OrganizationContext);
  const authContext = useContext(AuthContext);
  const shiftContext = useContext(ShiftContext);

  const { clearShifts } = shiftContext;

  const {
    deleteOrganization,
    setCurrentOrganization,
    clearCurrentOrganization
  } = organizationContext;

  const { getOrganization } = authContext;

  const { _id, name, rate } = organization;

  const getOrg = () => {
    getOrganization({ name: name });
    clearShifts();
  };

  const onDelete = () => {
    deleteOrganization(_id);
    clearCurrentOrganization();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-left'>
        {' '}
        {name}{' '}
        <span
          style={{
            float: 'right'
          }}
          className={'badge badge-success'}
        >
          <i className='fas fa-dollar-sign'> </i> {rate}{' '}
        </span>{' '}
      </h3>{' '}
      <br />
      <br />
      <p>
        <Link to='/shifts'>
          {' '}
          <button className='btn btn-success' onClick={getOrg}>
            {' '}
            Join{' '}
          </button>
        </Link>{' '}
        <button
          className='btn btn-dark '
          onClick={() => setCurrentOrganization(organization)}
        >
          {' '}
          Edit{' '}
        </button>{' '}
        <button className='btn btn-danger' onClick={onDelete}>
          Delete{' '}
        </button>{' '}
      </p>{' '}
    </div>
  );
};

OrganizationItem.propTypes = {
  organization: PropTypes.object.isRequired
};

export default OrganizationItem;
