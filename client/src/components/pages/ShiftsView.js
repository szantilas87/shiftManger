import React from 'react';
import Shifts from '../shifts/Shifts';
import ShiftForm from '../shifts/ShiftForm';

const ShiftsView = () => {
  return (
    <div>
      <div>
        <Shifts />
      </div>
      <div>
        <ShiftForm />
      </div>
    </div>
  );
};

export default ShiftsView;
