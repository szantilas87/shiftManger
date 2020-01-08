import React, { useState, useContext } from 'react';
import ShiftContext from '../../context/shift/shiftContext';

const ShiftForm = () => {
  const shiftContext = useContext(ShiftContext);

  const [shift, setShift] = useState({
    name: '',
    user: '',
    startDate: '',
    startTime: '',
    endTime: '',
    rest: ''
  });

  const { name, user, startDate, startTime, endTime, rest } = shift;

  const onChange = e =>
    setShift({
      ...shift,
      [e.target.name]: e.target.value
    });

  const onSubmit = e => {
    e.preventDefault();
    shiftContext.addShift(shift);
    setShift({
      name: '',
      user: '',
      startDate: '',
      startTime: '',
      endTime: '',
      rest: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'> Add Shift </h2>{' '}
      <input
        type='text'
        name='user'
        placeholder='User'
        value={user}
        onChange={onChange}
      />{' '}
      Date:{' '}
      <input
        type='date'
        name='startDate'
        value={startDate}
        onChange={onChange}
      />{' '}
      Start time:{' '}
      <input
        type='time'
        name='startTime'
        value={startTime}
        onChange={onChange}
      />{' '}
      <br />
      Finish time:{' '}
      <input
        type='time'
        name='endTime'
        value={endTime}
        onChange={onChange}
      />{' '}
      <br />
      Break:{' '}
      <input
        type='time'
        name='rest'
        placeholder='Break'
        value={rest}
        onChange={onChange}
      />{' '}
      <div>
        <input
          type='submit'
          value='Add Shift'
          className='btn btn-primary btn-block'
        />
      </div>{' '}
    </form>
  );
};

export default ShiftForm;
