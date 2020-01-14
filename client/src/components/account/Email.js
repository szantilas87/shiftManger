import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Email = ({ props }) => {
  const authContext = useContext(AuthContext);

  const { user, updateUser, leaveEditUser } = authContext;

  useEffect(() => {
    if (user !== null) {
      setUser(user);
    } else {
      setUser({
        email: ''
      });
    }
  }, [authContext, user]);

  const [userChange, setUser] = useState({
    email: ''
  });

  const { email } = userChange;

  const onChange = e =>
    setUser({
      ...userChange,
      [e.target.name]: e.target.value
    });

  const onSubmitEmail = e => {
    e.preventDefault();
    updateUser(userChange);
    leaveEditUser();
    props.history.push('/');
  };

  return (
    <form onSubmit={onSubmitEmail}>
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
    </form>
  );
};

export default Email;
