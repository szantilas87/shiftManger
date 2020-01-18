import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Password = ({ props }) => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;
  const { user, updateUser, leaveEditUser } = authContext;

  useEffect(() => {
    if (user !== null) {
      setUser({
        _id: user._id
      });
    } else {
      setUser({
        password: ''
      });
    }
  }, [authContext, user]);

  const [userChange, setUser] = useState({
    password: ''
  });

  const { password } = userChange;

  const onChange = e =>
    setUser({
      ...userChange,
      [e.target.name]: e.target.value
    });

  const onSubmitPassword = e => {
    e.preventDefault();
    if (password === '') {
      setAlert('Please enter all fields', 'danger');
    } else {
      updateUser(userChange);
    }
    leaveEditUser();
    props.history.push('/');
  };

  return (
    <form onSubmit={onSubmitPassword}>
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
      <input
        type='submit'
        value='Change password'
        className='btn btn-primary btn-block'
      />
    </form>
  );
};

export default Password;
