import React, { useState, useContext } from 'react';
import OrganizationContext from '../../context/organization/organizationContext';

const OrganizationForm = () => {
  const organizationContext = useContext(OrganizationContext);

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
    organizationContext.addOrganization(organization);
    setOrganization({
      name: '',
      rate: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'> Add Contact </h2>{' '}
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
          value='Add Organization'
          className='btn btn-primary btn-block'
        />
      </div>{' '}
    </form>
  );
};

export default OrganizationForm;
