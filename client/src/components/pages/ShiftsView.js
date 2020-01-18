import React, {
  useContext,
  useEffect,
  Fragment
} from 'react';
import ShiftsJoined from '../shifts/ShiftsJoined';
import ShiftFilterJoined from '../shifts/ShiftFilterJoined';
import ShiftFormJoined from '../shifts/ShiftFormJoined';
import AuthContext from '../../context/auth/authContext';
import ShiftContext from '../../context/shift/shiftContext';

const ShiftsView = () => {
  const authContext = useContext(AuthContext);
  const shiftContext = useContext(ShiftContext);

  const {
    getShiftsJoined
  } = shiftContext;

  const {
    loadOrganization
  } = authContext;
  const organizationId = localStorage.getItem('organizationId');

  useEffect(() => {
    loadOrganization();
    getShiftsJoined({
      organizationId
    });
    // eslint-disable-next-line
  }, []);

  return ( <
    Fragment >
    <
    div >
    <
    br / >
    <
    br / >
    <
    div >
    <
    ShiftFilterJoined / >
    <
    ShiftsJoined / >
    <
    /div>{' '} <
    br / >
    <
    br / >
    <
    div className = 'shift-form' >
    <
    ShiftFormJoined / >
    <
    /div>{' '} <
    br / >
    <
    br / >
    <
    /div>{' '} <
    /Fragment>
  );
};

export default ShiftsView;