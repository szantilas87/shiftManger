import React, { Fragment, useContext, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';

const Organizations = () => {
  const organizationContext = useContext(OrganizationContext);
  const {
    organizations,
    filtered,
    getOrganizations,
    loading
  } = organizationContext;

  useEffect(() => {
    getOrganizations();
    // eslint-disable-next-line
  }, []);

  if (organizations !== null && organizations.length === 0 && loading) {
    return <h4>Please add an organization</h4>;
  }
  return (
    <Fragment>
      {organizations !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(organization => (
                <CSSTransition
                  timeout={500}
                  key={organization._id}
                  classNames='item'
                >
                  <OrganizationItem organization={organization} />
                </CSSTransition>
              ))
            : organizations.map(organization => (
                <CSSTransition
                  key={organization._id}
                  timeout={500}
                  classNames='item'
                >
                  <OrganizationItem organization={organization} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Organizations;
