import { Avatar, Card, Text } from '@geist-ui/react';
import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { UserContext } from '../..';
import ReactCountryFlag from 'react-country-flag';
import { getCode } from 'country-list';

const Passport = observer(({ userId }) => {
  const user = useContext(UserContext);

  return (
    <div className='userpage__passport'>
      <Card shadow>
        <div className='userpage__passport_header'>
          <Text h3>Passport</Text>
          <Text font='10px'>Serial id: {userId}</Text>
        </div>
        <div className='userpage__passport_photo'>
          <Avatar
            text={user.email}
            src={
              user.avatar ||
              'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
          />
        </div>
        <div className='userpage__passport_body'>
          {user.name && (
            <div>
              <p>Name</p>
              <div />
              <p>{user.name}</p>
            </div>
          )}
          {user.lastName && (
            <div>
              <p>Last Name</p>
              <div />
              <p>{user.lastName}</p>
            </div>
          )}
          {user.email && (
            <div>
              <p>Email</p>
              <div />
              <p>{user.email}</p>
            </div>
          )}
          {user.age && (
            <div>
              <p>Age</p>
              <div />
              <p>{user.age}</p>
            </div>
          )}
          {user.country && (
            <div>
              <p>Country</p>
              <div />
              <p>
                {user.country && (
                  <ReactCountryFlag
                    countryCode={getCode(user.country)}
                    svg
                    style={{
                      width: '2em',
                      height: '2em',
                      marginRight: '10px',
                    }}
                    title={user.country}
                  />
                )}
                {user.region && `${user.region}, `}
                {user.country}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
});

export default Passport;
