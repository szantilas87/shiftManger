import React, { useState, useContext } from 'react';
import ShiftContext from '../../context/shift/shiftContext';

const ShiftForm = () => {
  const shiftContext = useContext(ShiftContext);

  const [shift, setShift] = useState({
    name: '',
    user: '',
    start: '',
    end: '',
    rest: ''
  });

  const { name, user, start, end, rest } = shift;

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
      start: '',
      end: '',
      rest: ''
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'> Add Shift </h2>{' '}
      <input
        type='text'
        name='name'
        placeholder='Name'
        value={name}
        onChange={onChange}
      />{' '}
      <input
        type='text'
        name='user'
        placeholder='User'
        value={user}
        onChange={onChange}
      />{' '}
      Start time:{' '}
      <input
        type='datetime-local'
        name='start'
        placeholder='Start Date'
        value={start}
        onChange={onChange}
      />{' '}
      <br />
      Finish time:{' '}
      <input
        type='datetime-local'
        name='end'
        placeholder='End Date'
        value={end}
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
