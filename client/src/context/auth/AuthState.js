import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from './../../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  GET_ORGANIZATION_TOKEN,
  GET_TOKEN_FAIL
} from '../types';

const AuthState = props => {
  const initialState = {
    userToken: localStorage.getItem('userToken'),
    organizationToken: localStorage.getItem('organizationToken'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //   Load User
  const loadUser = async () => {
    if (localStorage.userToken) {
      setAuthToken(localStorage.userToken);
    }
    try {
      const res = await axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };
  // Register User
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/users', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Login User
  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/auth', formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout
  const logout = () =>
    dispatch({
      type: LOGOUT
    });

  // Get token for organization
  const getOrganization = async name => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/organization', name, config);

      dispatch({
        type: GET_ORGANIZATION_TOKEN,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_TOKEN_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  // Clear Errors
  const clearErrors = () =>
    dispatch({
      type: CLEAR_ERRORS
    });

  return (
    <AuthContext.Provider
      value={{
        userToken: state.userToken,
        organizationToken: state.organizationToken,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        getOrganization
      }}
    >
      {props.children}{' '}
    </AuthContext.Provider>
  );
};

export default AuthState;
