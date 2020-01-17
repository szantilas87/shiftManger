import React, { Fragment, useContext, useEffect } from 'react';
import ShiftItemJoined from './ShiftItemJoined';
import ShiftContext from '../../context/shift/shiftContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const Shifts = () => {
  const authContext = useContext(AuthContext);
  const shiftContext = useContext(ShiftContext);

  const { organizationName } = authContext;
  const { shiftsJoined, filteredJoined, loading } = shiftContext;

  if (shiftsJoined !== null && shiftsJoined.length === 0 && !loading) {
    return <h4> Please add a shift </h4>;
  }
  return (
    <Fragment>
      <h1> {organizationName} </h1>{' '}
      {shiftsJoined !== null ? (
        <table className='shifts'>
          {' '}
          <thead>
            {' '}
            <tr>
              {' '}
              <th> Employee name </th> <th> Shift date </th>{' '}
              <th> Start time </th> <th> Finish time </th> <th> Break </th>{' '}
              <th> Worked Hours </th> <th> Shift Cost </th>
              <th> Edit / Delete </th>{' '}
            </tr>{' '}
          </thead>{' '}
          {filteredJoined !== null
            ? filteredJoined.map(shift => (
                <ShiftItemJoined key={shift._id} shift={shift} />
              ))
            : shiftsJoined.map(shift => (
                <ShiftItemJoined key={shift._id} shift={shift} />
              ))}{' '}
        </table>
      ) : (
        <Spinner />
      )}{' '}
    </Fragment>
  );
};

export default Shifts;
