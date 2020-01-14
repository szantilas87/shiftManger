import React, { useState, useContext, useEffect, Fragment } from 'react';
import AlertContext from '../../context/alert/alertContext';
import Email from './Email';
import Password from './Password';
import AuthContext from '../../context/auth/authContext';

const Account = props => {
  // const alertContext = useContext(AlertContext);
  // const authContext = useContext(AuthContext);

  // const { setAlert } = alertContext;
  // const { user, updateUser, leaveEditUser } = authContext;

  // useEffect(() => {
  //   if (user !== null) {
  //     setUser(user);
  //   } else {
  //     setUser({
  //       email: ''
  //     });
  //   }
  // }, [authContext, user]);

  // const [userChange, setUser] = useState({
  //   email: ''
  // });

  // const { email } = userChange;

  // const onChange = e =>
  //   setUser({
  //     ...userChange,
  //     [e.target.name]: e.target.value
  //   });

  // // const onSubmitPassword = e => {
  // //   e.preventDefault();
  // //   if (email === '' || password === '') {
  // //     setAlert('Please enter all fields', 'danger');
  // //   } else if (password !== password2) {
  // //     setAlert('Password do not match', 'danger');
  // //   } else {
  // //     updateUser({ user });
  // //   }
  // // };

  // const onSubmitEmail = e => {
  //   e.preventDefault();
  //   updateUser(userChange);
  //   leaveEditUser();
  //   props.history.push('/');
  // };

  return (
    <Fragment>
      <h1 className='text-center'>
        Manage <span className='text-primary'> Account </span>{' '}
      </h1>{' '}
      <div className='grid-3'>
        {/*<form onSubmit={onSubmitEmail}>
          <div className='form-group'>
            <label htmlFor='email'> Email Address </label>{' '}
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              required
              minLength='6'
            />
          </div>{' '}
          <input
            type='submit'
            value='Change Email'
            className='btn btn-primary btn-block'
          />
        </form>{' '}
        <div> </div>{' '}
        {/* <form onSubmit={onSubmitPassword}>
          <div className='form-group'>
            <label htmlFor='password'> Password </label>{' '}
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              required
              minLength='6'
            />
          </div>{' '}
          <div className='form-group'>
            <label htmlFor='password2'> Confirm Password </label>{' '}
            <input
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              required
            />
          </div>{' '}
          <input
            type='submit'
            value='Change password'
            className='btn btn-primary btn-block'
          />
        </form>*/}
        <Email props={props} />
        <Password props={props} />
      </div>
    </Fragment>
  );
};

export default Account;
