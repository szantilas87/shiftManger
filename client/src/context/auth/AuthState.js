import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthUserToken from '../../utils/setAuthUserToken';
import setAuthOrgToken from '../../utils/setAuthOrgToken';
import {
  REGISTER_SUCCESS,
  ORGANIZATION_ERROR,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  CLEAR_ORGANIZATION_ID,
  GET_ORGANIZATION_TOKEN,
  GET_TOKEN_FAIL,
  ORGANIZATION_LOADED,
  LEAVE_ORGANIZATION,
  EDIT_USER,
  LEAVE_EDIT_USER,
  UPDATE_USER,
  ERROR,
  GET_USERS
} from '../types';

const AuthState = props => {
  const initialState = {
    userToken: localStorage.getItem('userToken'),
    organizationToken: localStorage.getItem('organizationToken'),
    isAuthenticated: null,
    loading: true,
    users: null,
    user: null,
    error: null,
    organization: null,
    edit: null,
    organizationId: null,
    userId: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  // Get Users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };
  //   Load User
  const loadUser = async () => {
    if (localStorage.userToken) {
      setAuthUserToken(localStorage.userToken);
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

  // Update User
  const updateUser = async user => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/users/${user._id}`, user, config);
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
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

      loadOrganization();
    } catch (err) {
      dispatch({
        type: GET_TOKEN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Load Organization
  const loadOrganization = async () => {
    if (localStorage.organizationToken) {
      setAuthOrgToken(localStorage.organizationToken);
    }

    try {
      const res = await axios.get('/api/organization');
      dispatch({
        type: ORGANIZATION_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ORGANIZATION_ERROR
      });
    }
  };

  // Leave organization
  const leaveOrg = () =>
    dispatch({
      type: LEAVE_ORGANIZATION
    });
  // Clear Errors
  const clearErrors = () =>
    dispatch({
      type: CLEAR_ERRORS
    });

  // Clear OrganizationId
  const clearOrganizationId = () =>
    dispatch({
      type: CLEAR_ORGANIZATION_ID
    });

  // Edit User
  const editUser = () =>
    dispatch({
      type: EDIT_USER
    });
  // Leave Edit User
  const leaveEditUser = () =>
    dispatch({
      type: LEAVE_EDIT_USER
    });

  return (
    <AuthContext.Provider
      value={{
        userToken: state.userToken,
        organizationToken: state.organizationToken,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        organization: state.organization,
        user: state.user,
        users: state.users,
        error: state.error,
        edit: state.edit,
        organizationId: state.organizationId,
        userId: state.userId,
        register,
        loadUser,
        login,
        logout,
        clearErrors,
        getOrganization,
        loadOrganization,
        leaveOrg,
        editUser,
        leaveEditUser,
        updateUser,
        getUsers,
        clearOrganizationId
      }}
    >
      {' '}
      {props.children}{' '}
    </AuthContext.Provider>
  );
};

export default AuthState;
