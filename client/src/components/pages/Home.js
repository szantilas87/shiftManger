import React, { useContext, useEffect } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationForm from '../organizations/OrganizationForm';
import OrganizationFilter from '../organizations/OrganizationFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, getUsers, loadOrganization } = authContext;

  useEffect(() => {
    loadUser();
    getUsers();
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
