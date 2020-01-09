import React from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationForm from '../organizations/OrganizationForm';
import OrganizationFilter from '../organizations/OrganizationFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <OrganizationForm />
      </div>{' '}
      <div>
        <OrganizationFilter />
        <Organizations />
      </div>{' '}
    </div>
  );
};

export default Home;
