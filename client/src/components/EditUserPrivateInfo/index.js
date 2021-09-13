import { Button, Dot, Input, Text, Tooltip, useToasts } from '@geist-ui/react';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../..';
import { privateInfoUpdate } from '../../actions/user';

const EditUserPrivateInfo = observer(() => {
  const user = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [arePasswordsSame, setArePasswordsSame] = useState(true);
  const [isDataTouched, setIsDataTouched] = useState(false);
  const [, setToast] = useToasts();
  const [submitClicked, setSubmitClicked] = useState(false);
  const history = useHistory();

  const handlePasswordInputs = (value, where) => {
    if (!isDataTouched) {
      setIsDataTouched(() => true);
    }
    if (!arePasswordsSame) {
      setArePasswordsSame(() => true);
    }
    where === 'password' && setPassword(() => value);
    where === 'passwordRepeat' && setPasswordRepeat(() => value);
  };

  const handleInput = (value, field) => {
    if (!isDataTouched) {
      setIsDataTouched(() => true);
    }
    user.setByField(value, field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password.length < 8) {
      setToast({
        text: 'Password must be at least 8 characters',
        type: 'error',
        delay: 5000,
      });

      return;
    }

    if (password !== passwordRepeat) {
      return setArePasswordsSame(() => false);
    }

    setSubmitClicked(true);

    const r = await privateInfoUpdate({
      id: user._id,
      email: user.email,
      password: password,
    });

    if (r) {
      setToast({
        text: r.data.message,
        type: r.status === 400 ? 'error' : 'success',
        delay: 5000,
      });

      if (r.status === 200) {
        user.setUser({ ...r.data.user });
        
        setIsDataTouched(false);

        user.reset();

        setToast({
          text: 'You must login again',
          type: 'secondary',
          delay: 5000,
        });

        history.push({
          pathname: '/login',
        });
      }
    }

    setSubmitClicked(false);
  };

  const handleEditGeneral = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/user',
      search: `?id=${user._id}`,
    });
  };

  return (
    <div className='userpage__userInfo'>
      <div className='userpage__userInfo_header'>
        <Text h3>Edit your private information</Text>
        <Tooltip text='General information' placement='top' trigger='hover'>
          <Button type='secondary' ghost onClick={handleEditGeneral}>
            Edit general info
          </Button>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          htmlType='email'
          onChange={(e) => handleInput(e.target.value, 'email')}
          placeholder={user.email}
          value={user.email}>
          <Text h5>Email</Text>
        </Input>
        <Input.Password
          type={!arePasswordsSame && 'error'}
          onChange={(e) => handlePasswordInputs(e.target.value, 'password')}
          placeholder={password}
          value={password}>
          {!arePasswordsSame && (
            <Dot type='error'>
              <Text small>Passwords not match</Text>
            </Dot>
          )}
          <Text h5>New password</Text>
        </Input.Password>
        <Input.Password
          type={!arePasswordsSame && 'error'}
          onChange={(e) => handlePasswordInputs(e.target.value, 'passwordRepeat')}
          placeholder={passwordRepeat}
          value={passwordRepeat}>
          <Text h5>New password repeat</Text>
        </Input.Password>
        <div className='with-label userpage__userInfo_submit'>
          <div />
          <Button
            shadow
            type='success'
            disabled={submitClicked || !arePasswordsSame}
            loading={submitClicked}
            htmlType='submit'>
            Save changes
          </Button>
          <div>
            {isDataTouched ? (
              <Text>
                <Dot style={{ marginLeft: '15px' }} type='warning' />
                Changes are not saved yet
              </Text>
            ) : (
              <Text>
                <Dot style={{ marginLeft: '15px' }} type='success' />
                Changes are up to date
              </Text>
            )}
          </div>
        </div>
      </form>
    </div>
  );
});

export default EditUserPrivateInfo;
