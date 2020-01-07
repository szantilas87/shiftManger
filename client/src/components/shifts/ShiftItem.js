import React from 'react';
import PropTypes from 'prop-types';

const ShiftItem = ({ shift }) => {
  const { id, user, name, start, end, rest } = shift;
  return (
    <div className='card bg-light'>
      <ul>
        <li>{name}</li>
        <li>{start}</li>
        <li>{end}</li>
        <li>{rest}</li>
        <li>{user}</li>
      </ul>
      <button className='btn btn-dark btn-sm'>Edit</button>
      <button className='btn btn-danger btn-sm'>Delete</button>
    </div>
  );
};

ShiftItem.propTypes = {
  shift: PropTypes.object.isRequired
};

export default ShiftItem;
