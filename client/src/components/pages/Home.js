import React, { useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationForm from '../organizations/OrganizationForm';
import OrganizationFilter from '../organizations/OrganizationFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, loadOrganization } = authContext;

  useEffect(() => {
    loadUser();
    // loadOrganization();
    // eslint-disable-next-line
  }, []);
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
