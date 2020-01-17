import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import ShiftContext from '../../context/shift/shiftContext';
import AuthContext from '../../context/auth/authContext';

const ShiftItemJoined = ({ shift }) => {
  const shiftContext = useContext(ShiftContext);
  const {
    deleteShiftJoined,
    setCurrentShift,
    clearCurrentShift
  } = shiftContext;
  const authContext = useContext(AuthContext);
  const { _id, user, startDate, startTime, endTime, rest } = shift;

  const onDelete = () => {
    deleteShiftJoined(_id);
    clearCurrentShift();
  };

  const getMinutes = val => {
    let t = val.split(':');
    let minutes = +t[0] * 60 + +t[1];

    return minutes;
  };

  let startMin = getMinutes(startTime);
  let endMin = getMinutes(endTime);
  let restMin = getMinutes(rest);

  const getPaid = (start, end, rest) => {
    const rate = 10;
    let pay = (end - start - rest) * (rate / 60);

    return Math.round(pay);
  };

  const workedHours = (start, end, rest) => {
    let totalMinutes;
    if (start > end) {
      totalMinutes = start - end - rest;
    } else {
      totalMinutes = end - start - rest;
    }
    let h = Math.floor(totalMinutes / 60);
    let m = totalMinutes % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    return h + ':' + m;
  };

  return (
    <Fragment>
      <tbody>
        <tr>
          <td> {user} </td> <td> {startDate} </td> <td> {startTime} </td>{' '}
          <td> {endTime} </td> <td> {restMin} </td>{' '}
          <td> {workedHours(startMin, endMin, restMin)} </td>{' '}
          <td>
            {' '}
            {getPaid(startMin, endMin, restMin)}{' '}
            <i className='fas fa-dollar-sign'> </i>{' '}
          </td>{' '}
          <td>
            <button
              className='btn btn-dark btn-sm'
              onClick={() => setCurrentShift(shift)}
            >
              Edit{' '}
            </button>{' '}
            <button className='btn btn-danger btn-sm' onClick={onDelete}>
              Delete{' '}
            </button>{' '}
          </td>{' '}
        </tr>{' '}
      </tbody>{' '}
    </Fragment>
  );
};

ShiftItemJoined.propTypes = {
  shift: PropTypes.object.isRequired
};

export default ShiftItemJoined;
