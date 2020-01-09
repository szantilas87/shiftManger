import React, { useState, useContext, useEffect } from 'react';
import OrganizationContext from '../../context/organization/organizationContext';
import { set } from 'mongoose';

const OrganizationForm = () => {
  const organizationContext = useContext(OrganizationContext);

  const {
    addOrganization,
    clearCurrentOrganization,
    updateOrganization,
    current
  } = organizationContext;

  useEffect(() => {
    if (current !== null) {
      setOrganization(current);
    } else {
      setOrganization({
        name: '',
        rate: ''
      });
    }
  }, [organizationContext, current]);

  const [organization, setOrganization] = useState({
    name: '',
    rate: ''
  });

  const { name, rate } = organization;

  const onChange = e =>
    setOrganization({
      ...organization,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addOrganization(organization);
    } else {
      updateOrganization(organization);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentOrganization();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {' '}
        {current ? 'Edit Organization' : 'Add Organization'}
      </h2>{' '}
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        onChange={onChange}
      />{' '}
      <input
        type='number'
        name='rate'
        placeholder='Hourly Rate'
        value={rate}
        onChange={onChange}
        min='1'
      />
      <div>
        <input
          type='submit'
          value={current ? 'Update Organization' : 'Add Organization'}
          className='btn btn-primary btn-block'
        />
      </div>{' '}
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default OrganizationForm;
