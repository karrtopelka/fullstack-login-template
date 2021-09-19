import { Card } from '@geist-ui/react';
import React, { useContext } from 'react';
import { Redirect, useLocation } from 'react-router';
import EditUserInfo from '../EditUserInfo';
import EditUserPrivateInfo from '../EditUserPrivateInfo';
import Passport from '../Passport';
import Toaster from '../Toaster';
import { UserContext } from '../..';
import './userpage.scss';

const UserPage = () => {
  const user = useContext(UserContext);
  const query = new URLSearchParams(useLocation().search);
  const userId = query.get('id');
  const isPrivateInfo = query.get('private');

  if (userId === null) {
    return (
      <>
        {Toaster({
          text: 'User not found',
          type: 'error',
        })}

        <Redirect to='/' />
      </>
    );
  }

  return (
    <div className='userpage'>
      <Card>
        <div className='userpage__wrapper'>
          <Passport userId={userId} />
          {user._id === userId && (
            <>
              <div className='userpage__divider' />
              {isPrivateInfo ? <EditUserPrivateInfo /> : <EditUserInfo />}
              <div className='userpage__divider' />
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default UserPage;
