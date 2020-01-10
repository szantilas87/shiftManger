import React, { useState, useContext, useEffect, Fragment } from 'react';
import ShiftContext from '../../context/shift/shiftContext';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

const ShiftForm = props => {
  const shiftContext = useContext(ShiftContext);
  const authContext = useContext(AuthContext);

  const { leaveOrg } = authContext;
  const { addShift, clearCurrentShift, updateShift, current } = shiftContext;

  useEffect(() => {
    if (current !== null) {
      setShift(current);
    } else {
      setShift({
        name: '',
        user: '',
        startDate: '',
        startTime: '',
        endTime: '',
        rest: ''
      });
    }
  }, [shiftContext, current]);

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
    if (current === null) {
      addShift(shift);
    } else {
      updateShift(shift);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentShift();
  };

  const onLeave = () => {
    leaveOrg();
  };

  return (
    <Fragment>
      <Link to='/'>
        <button className='btn btn-danger btn-block' onClick={onLeave}>
          Leave Organization
        </button>
      </Link>
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <h2 className='text-primary'>
          {' '}
          {current ? 'Edit Shift' : 'Add Shift'}{' '}
        </h2>{' '}
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
            value={current ? 'Update Shift' : 'Add Shift'}
            className='btn btn-primary btn-block'
          />{' '}
        </div>{' '}
        {current && (
          <div>
            <button className='btn btn-light btn-block' onClick={clearAll}>
              Clear
            </button>
          </div>
        )}
      </form>
    </Fragment>
  );
};

export default ShiftForm;
