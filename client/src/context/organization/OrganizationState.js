import React, { useReducer } from 'react';
import axios from 'axios';
import organizationReducer from './organizationReducer';
import OrganizationContext from './organizationContext';
import {
  GET_ORGANIZATIONS,
  ADD_ORGANIZATION,
  DELETE_ORGANIZATION,
  SET_CURRENT_ORGANIZATION,
  CLEAR_CURRENT_ORGANIZATION,
  CLEAR_ORGANIZATIONS,
  UPDATE_ORGANIZATION,
  FILTER_ORGANIZATIONS,
  CLEAR_FILTER,
  ERROR
} from '../types';

const OrganizationState = props => {
  const initialState = {
    organizations: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(organizationReducer, initialState);
  // Get Organizations
  const getOrganizations = async () => {
    try {
      const res = await axios.get('/api/organizations');
      dispatch({
        type: GET_ORGANIZATIONS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Add Organization
  const addOrganization = async organization => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/organizations', organization, config);
      dispatch({
        type: ADD_ORGANIZATION,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };

  // Delete Organization

  const deleteOrganization = async id => {
    try {
      await axios.delete(`/api/organizations/${id}`);

      dispatch({
        type: DELETE_ORGANIZATION,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.msg
      });
    }
  };
  // Clear Organizations
  const clearOrganizations = () => {
    dispatch({
      type: CLEAR_ORGANIZATIONS
    });
  };
  // Set Current Organization
  const setCurrentOrganization = organization => {
    dispatch({
      type: SET_CURRENT_ORGANIZATION,
      payload: organization
    });
  };

  // Clear Current Organization
  const clearCurrentOrganization = () => {
    dispatch({
      type: CLEAR_CURRENT_ORGANIZATION
    });
  };
  // Update Organization
  const updateOrganization = organization => {
    dispatch({
      type: UPDATE_ORGANIZATION,
      payload: organization
    });
  };

  // Filter Organizations
  const filterOrganizations = text => {
    dispatch({
      type: FILTER_ORGANIZATIONS,
      payload: text
    });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({
      type: CLEAR_FILTER
    });
  };

  return (
    <OrganizationContext.Provider
      value={{
        organizations: state.organizations,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addOrganization,
        deleteOrganization,
        setCurrentOrganization,
        clearCurrentOrganization,
        updateOrganization,
        filterOrganizations,
        clearFilter,
        getOrganizations,
        clearOrganizations
      }}
    >
      {' '}
      {props.children}{' '}
    </OrganizationContext.Provider>
  );
};

export default OrganizationState;
