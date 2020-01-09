import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import OrganizationContext from '../../context/organization/organizationContext';

const OrganizationItem = ({ organization }) => {
  const organizationContext = useContext(OrganizationContext);
  const {
    deleteOrganization,
    setCurrentOrganization,
    clearCurrentOrganization
  } = organizationContext;

  const { id, name, rate } = organization;

  const onDelete = () => {
    deleteOrganization(id);
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
        <button className='btn btn-success'> Join </button>{' '}
        <button
          className='btn btn-dark '
          onClick={() => setCurrentOrganization(organization)}
        >
          {' '}
          Edit{' '}
        </button>{' '}
        <button className='btn btn-danger' onClick={onDelete}>
          Delete
        </button>
      </p>{' '}
    </div>
  );
};

OrganizationItem.propTypes = {
  organization: PropTypes.object.isRequired
};

export default OrganizationItem;
