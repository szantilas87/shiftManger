import React, {
  useContext,
  useEffect,
  Fragment
} from 'react';
import ShiftsJoined from '../shifts/ShiftsJoined';
import ShiftFilter from '../shifts/ShiftFilter';
import ShiftForm from '../shifts/ShiftForm';
import AuthContext from '../../context/auth/authContext';
import ShiftContext from '../../context/shift/shiftContext';

const ShiftsView = () => {
  const authContext = useContext(AuthContext);
  const shiftContext = useContext(ShiftContext);

  const {
    shifts,
    filtered,
    getShifts,
    loading,
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
    ShiftFilter / >
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
    ShiftForm / >
    <
    /div>{' '} <
    br / >
    <
    br / >
    <
    /div> <
    /Fragment>
  );
};

export default ShiftsView;