import { Avatar, Card, Text, useToasts } from '@geist-ui/react';
import { observer } from 'mobx-react';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../..';
import ReactCountryFlag from 'react-country-flag';
import { getCode } from 'country-list';
import './passport.scss';
import { toJS } from 'mobx';
import { SocialIcon } from 'react-social-icons';
import { getUser } from '../../actions/user';
import { useHistory } from 'react-router';

const Passport = observer(({ userId }) => {
  const user = useContext(UserContext);
  const [fUser, setFUser] = useState({});
  const [, setToast] = useToasts();
  const history = useHistory();

  useEffect(() => {
    const getForeignUser = async () => {
      const r = await getUser({ id: userId });
      if (r) {
        if (r.status !== 200) {
          setToast({
            text: r.data.message,
            type: 'error',
            delay: 2500,
          });
          return history.push('/');
        }

        setFUser({ ...r.data.user });
      }
    };

    if (user._id !== userId) {
      getForeignUser();
    }

    return () => setFUser(() => {});
  }, [userId]);

  console.log(fUser);

  return (
    <div className='passport'>
      <Card shadow>
        <div className='passport__header'>
          <Text h3>Passport</Text>
          <Text font='10px'>Serial id: {userId}</Text>
        </div>
        <div className='passport__header-photo'>
          <Avatar
            text={fUser?.email || user.email}
            src={
              fUser?.avatar ||
              user.avatar ||
              'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
          />
        </div>
        <div className='passport__body'>
          {(fUser?.name || user.name) && (
            <div className='passport__body-row'>
              <p>Name</p>
              <div />
              <p>{fUser?.name || user.name}</p>
            </div>
          )}
          {(fUser?.lastName || user.lastName) && (
            <div className='passport__body-row'>
              <p>Last Name</p>
              <div />
              <p>{fUser?.lastName || user.lastName}</p>
            </div>
          )}
          {(fUser?.email || user.email) && (
            <div className='passport__body-row'>
              <p>Email</p>
              <div />
              <p>{fUser?.email || user.email}</p>
            </div>
          )}
          {(fUser?.age || user.age) && (
            <div className='passport__body-row'>
              <p>Age</p>
              <div />
              <p>{fUser?.age || user.age}</p>
            </div>
          )}
          {(fUser?.country || user.country) && (
            <div className='passport__body-row'>
              <p>Country</p>
              <div />
              <p>
                {(fUser?.country || user.country) && (
                  <ReactCountryFlag
                    countryCode={getCode(fUser?.country || user.country)}
                    svg
                    className='passport__body-flag'
                    title={fUser?.country || user.country}
                  />
                )}
                {(fUser?.region || user.region) && `${fUser?.region || user.region}, `}
                {fUser?.country || user.country}
              </p>
            </div>
          )}
          {(fUser?.socials || toJS(user.socials).length) && (
            <div className='passport__body-row'>
              <p>Social links</p>
              <div />
              {fUser?.socials ? (
                <>
                  {fUser?.socials.map((social) => (
                    <SocialIcon key={social} className='social' url={social} target='_blank' />
                  ))}
                </>
              ) : (
                <>
                  {toJS(user.socials).map((social) => (
                    <SocialIcon key={social} className='social' url={social} target='_blank' />
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
});

export default Passport;
