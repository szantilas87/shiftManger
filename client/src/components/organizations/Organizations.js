import React, { Fragment, useContext } from 'react';
import OrganizationItem from './OrganizationItem';
import OrganizationContext from '../../context/organization/organizationContext';

const Organizations = () => {
  const organizationContext = useContext(OrganizationContext);
  const { organizations } = organizationContext;
  return (
    <Fragment>
      {organizations.map(organization => (
        <OrganizationItem key={organization.id} organization={organization} />
      ))}
    </Fragment>
  );
};

export default Organizations;
