import React, { useContext, useEffect, Fragment } from 'react';
import Organizations from '../organizations/Organizations';
import OrganizationForm from '../organizations/OrganizationForm';
import OrganizationFilter from '../organizations/OrganizationFilter';
import Shifts from '../shifts/Shifts';
import ShiftFilter from '../shifts/ShiftFilter';
import ShiftForm from '../shifts/ShiftForm';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { getUsers, organizationId, organization } = authContext;
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      {' '}
      {organizationId !== 'none' ? (
        <div>
          <br />
          <br />
          <div>
            <ShiftFilter />
            <Shifts />
          </div>{' '}
          <br />
          <br />
          <div className='shift-form'>
            <ShiftForm />
          </div>{' '}
          <br />
          <br />
        </div>
      ) : (
        <div className='grid-2'>
          <div>
            <OrganizationForm />
          </div>{' '}
          <div>
            <OrganizationFilter />
            <Organizations />
          </div>{' '}
        </div>
      )}{' '}
    </Fragment>
  );
};

export default Home;
