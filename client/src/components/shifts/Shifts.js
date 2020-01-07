import React, { Fragment, useContext } from 'react';
import ShiftItem from './ShiftItem';
import ShiftContext from '../../context/shift/shiftContext';

const Shifts = () => {
  const shiftContext = useContext(ShiftContext);
  const { shifts } = shiftContext;
  return (
    <Fragment>
      {' '}
      {shifts.map(shift => (
        <ShiftItem key={shift.id} shift={shift} />
      ))}{' '}
    </Fragment>
  );
};

export default Shifts;
