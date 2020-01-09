import React, { useContext, useRef, useEffect } from 'react';
import ShiftContext from '../../context/shift/shiftContext';

const ShiftFilter = () => {
  const shiftContext = useContext(ShiftContext);
  const text = useRef('');

  const { filterShifts, clearFilter, filtered } = shiftContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterShifts(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Shifts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ShiftFilter;
