import React, {
  useContext,
  useRef,
  useEffect
} from 'react';
import ShiftContext from '../../context/shift/shiftContext';

const ShiftFilterJoined = () => {
  const shiftContext = useContext(ShiftContext);
  const text = useRef('');

  const {
    filterShiftsJoined,
    clearFilter,
    filteredJoined
  } = shiftContext;

  useEffect(() => {
    if (filteredJoined === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterShiftsJoined(e.target.value);
    } else {
      clearFilter();
    }
  };
  return ( <
    form >
    <
    input ref = {
      text
    }
    type = 'text'
    placeholder = 'Filter Shifts...'
    onChange = {
      onChange
    }
    />{' '} <
    /form>
  );
};

export default ShiftFilterJoined;