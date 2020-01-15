import React, { Fragment, useContext, useEffect } from 'react';
import ShiftItem from './ShiftItem';
import ShiftContext from '../../context/shift/shiftContext';
import AuthContext from '../../context/auth/authContext';
import Spinner from '../layout/Spinner';

const Shifts = () => {
  const orgName = localStorage.getItem('currentOrg');

  const authContext = useContext(AuthContext);
  const shiftContext = useContext(ShiftContext);

  const { shifts, filtered, getShifts, loading } = shiftContext;

  const { organization } = authContext;

  useEffect(() => {
    getShifts();
    // eslint-disable-next-line
  }, [organization]);

  if (shifts !== null && shifts.length === 0 && !loading) {
    return <h4> Please add a shift </h4>;
  }

  return (
    <Fragment>
      <h1> {orgName} </h1>{' '}
      {shifts !== null ? (
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
            : shifts.map(shift => (
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
