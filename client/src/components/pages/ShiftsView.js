import React from 'react';
import Shifts from '../shifts/Shifts';
import ShiftForm from '../shifts/ShiftForm';

const ShiftsView = () => {
  return (
    <div>
      <br />
      <br />
      <div>
        <Shifts />
      </div>{' '}
      <br />
      <br />
      <div>
        <ShiftForm />
      </div>{' '}
    </div>
  );
};

export default ShiftsView;
