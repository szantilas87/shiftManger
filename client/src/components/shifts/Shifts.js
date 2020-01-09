import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ShiftItem from './ShiftItem';
import ShiftContext from '../../context/shift/shiftContext';

const Shifts = () => {
  const shiftContext = useContext(ShiftContext);
  const { shifts, filtered } = shiftContext;

  if (shifts.length === 0) {
    return <h4>Please add a shift</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        <table className='shifts'>
          <thead>
            <tr>
              <th>Employee name</th>
              <th>Shift date</th>
              <th>Start time</th>
              <th>Finish time</th>
              <th>Break</th>
              <th>Worked Hours</th>
              <th>Shift Cost</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          {filtered !== null
            ? filtered.map(shift => (
                <CSSTransition key={shift.id} timeout={500} classNames='item'>
                  <ShiftItem shift={shift} />
                </CSSTransition>
              ))
            : shifts.map(shift => (
                <CSSTransition key={shift.id} timeout={500} classNames='item'>
                  <ShiftItem shift={shift} />
                </CSSTransition>
              ))}
        </table>
      </TransitionGroup>
    </Fragment>
  );
};

export default Shifts;
