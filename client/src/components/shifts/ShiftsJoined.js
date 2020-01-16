import React, { Fragment, useContext, useEffect } from 'react';
import ShiftItem from './ShiftItem';
import ShiftContext from '../../context/shift/shiftContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';
import ShiftForm from './ShiftForm';

const Shifts = () => {
  const orgName = localStorage.getItem('currentOrg');

  const authContext = useContext(AuthContext);
  const shiftContext = useContext(ShiftContext);

  const { shiftsJoined, filtered, loading } = shiftContext;

  if (shiftsJoined !== null && shiftsJoined.length === 0 && !loading) {
    return <h4> Please add a shift </h4>;
  }
  return (
    <Fragment>
      <h1> {orgName} </h1>{' '}
      {shiftsJoined !== null ? (
        <table className='shifts'>
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
          {filtered !== null
            ? filtered.map(shift => <ShiftItem key={shift._id} shift={shift} />)
            : shiftsJoined.map(shift => (
                <ShiftItem key={shift._id} shift={shift} />
              ))}{' '}
        </table>
      ) : (
        <Spinner />
      )}{' '}
    </Fragment>
  );
};

export default Shifts;
