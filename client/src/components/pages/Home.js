import React from 'react';
import Organizations from '../organizations/Organizations';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>{/* OrganizationForm */}</div>
      <div>
        <Organizations />
      </div>
    </div>
  );
};

export default Home;
