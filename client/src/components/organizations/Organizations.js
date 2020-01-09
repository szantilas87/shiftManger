import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';

const Organizations = () => {
  const organizationContext = useContext(OrganizationContext);
  const { organizations, filtered } = organizationContext;

  if (organizations.length === 0) {
    return <h4>Please add an organization</h4>;
  }
  return (
    <Fragment>
      <TransitionGroup>
        {filtered !== null
          ? filtered.map(organization => (
              <CSSTransition
                key={organization.id}
                timeout={500}
                classNames='item'
              >
                <OrganizationItem organization={organization} />
              </CSSTransition>
            ))
          : organizations.map(organization => (
              <CSSTransition
                key={organization.id}
                timeout={500}
                classNames='item'
              >
                <OrganizationItem organization={organization} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Organizations;
