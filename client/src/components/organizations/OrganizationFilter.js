import React, { useContext, useRef, useEffect } from 'react';
import OrganizationContext from '../../context/organization/organizationContext';

const OrganizationFilter = () => {
  const organizationContext = useContext(OrganizationContext);
  const text = useRef('');
  const { filterOrganizations, clearFilter, filtered } = organizationContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterOrganizations(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Organizations...'
        onChange={onChange}
      />
    </form>
  );
};

export default OrganizationFilter;
