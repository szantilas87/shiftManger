import React, { useState, useContext, useEffect, Fragment } from 'react';
import Email from './Email';
import Password from './Password';

const Account = props => {
  return (
    <Fragment>
      <h1 className='text-center'>
        Manage <span className='text-primary'> Account </span>{' '}
      </h1>{' '}
      <div className='grid-2'>
        <div>
          <Email props={props} />{' '}
        </div>{' '}
        <div>
          <Password props={props} />{' '}
        </div>{' '}
      </div>{' '}
    </Fragment>
  );
};

export default Account;
