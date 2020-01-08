import React, { Fragment, useContext } from 'react';
import ShiftItem from './ShiftItem';
import ShiftContext from '../../context/shift/shiftContext';

const Shifts = () => {
  const shiftContext = useContext(ShiftContext);
  const { shifts } = shiftContext;
  return (
    <Fragment>
      <table className='shifts'>
        <tr>
          <th>Employee name</th>
          <th>Shift date</th>
          <th>Start time</th>
          <th>Finish time</th>
          <th>Break</th>
          <th>Worked Hours</th>
          <th>Shift Cost</th>
          <th>Edit / Delete</th>
        </tr>
        {shifts.map(shift => (
          <ShiftItem key={shift.id} shift={shift} />
        ))}{' '}
      </table>
    </Fragment>
  );
};

export default Shifts;
