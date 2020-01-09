import React from 'react';
import Shifts from '../shifts/Shifts';
import ShiftForm from '../shifts/ShiftForm';
import ShiftFilter from '../shifts/ShiftFilter';

const ShiftsView = () => {
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
