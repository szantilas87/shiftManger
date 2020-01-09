import React, { useContext, useEffect } from 'react';
import Shifts from '../shifts/Shifts';
import ShiftForm from '../shifts/ShiftForm';
import AuthContext from '../../context/auth/authContext';
import ShiftFilter from '../shifts/ShiftFilter';

const ShiftsView = () => {
  const authContext = useContext(AuthContext);

  const { loadUser, loadOrganization } = authContext;

  useEffect(() => {
    loadUser();
    loadOrganization();
    // eslint-disable-next-line
  }, []);
  return (
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
  );
};

export default ShiftsView;
