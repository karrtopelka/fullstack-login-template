import { Button, Dot, Input, Spacer, Text, Tooltip, useToasts } from '@geist-ui/react';
import { observer } from 'mobx-react';
import React, { useContext, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useHistory } from 'react-router';
import { UserContext } from '../..';
import { infoUpdate } from '../../actions/user';
import AvatarUpload from '../AvatarUpload';
import { Plus, X } from '@geist-ui/react-icons';
import { toJS } from 'mobx';
import UserSocials from '../UserSocials';

const EditUserInfo = observer(() => {
  const user = useContext(UserContext);
  const [isDataTouched, setIsDataTouched] = useState(false);
  const [, setToast] = useToasts();
  const [submitClicked, setSubmitClicked] = useState(false);
  const history = useHistory();

  const handleInput = (value, field) => {
    if (!isDataTouched) {
      setIsDataTouched(() => true);
    }
    user.setByField(value, field);
  };

  const selectCountry = (country) => {
    if (!isDataTouched) {
      setIsDataTouched(() => true);
    }
    user.setRegion('');
    user.setCountry(country);
  };

  const selectRegion = (region) => {
    if (!isDataTouched) {
      setIsDataTouched(() => true);
    }
    user.setRegion(region);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    const r = await infoUpdate({
      id: user._id,
      name: user.name,
      lastName: user.lastName,
      avatar: user.avatar,
      age: user.age,
      country: user.country,
      region: user.region,
      socials: toJS(user.socials),
    });
    if (r) {
      setToast({
        text: r.data.message,
        type: r.status !== 200 ? 'error' : 'success',
        delay: 5000,
      });
      if (r.status === 200) {
        user.setUser({ ...r.data.user });
        setIsDataTouched(false);
      }
    }
    setSubmitClicked(false);
  };

  const handleEditPrivate = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/user',
      search: `?id=${user._id}&private=true`,
    });
  };

  return (
    <div className='userpage__userInfo'>
      <div className='userpage__userInfo-header'>
        <Text h3>Edit your general information</Text>
        <Tooltip text='Email and password' placement='top' trigger='hover'>
          <Button type='secondary' ghost onClick={handleEditPrivate}>
            Edit private info
          </Button>
        </Tooltip>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          htmlType='text'
          onChange={(e) => handleInput(e.target.value, 'name')}
          placeholder={user.name}
          value={user.name}>
          <Text h5>Name</Text>
        </Input>
        <Input
          htmlType='text'
          onChange={(e) => handleInput(e.target.value, 'lastName')}
          placeholder={user.lastName}
          value={user.lastName}>
          <Text h5>Last name</Text>
        </Input>
        <div className='with-label flexed'>
          <Input
            htmlType='url'
            onChange={(e) => handleInput(e.target.value, 'avatar')}
            placeholder={user.avatar}
            value={user.avatar}>
            <Text h5>Avatar (url)</Text>
          </Input>
          <AvatarUpload />
        </div>
        <Input
          min={1}
          max={100}
          htmlType='number'
          onChange={(e) => handleInput(e.target.value, 'age')}
          placeholder={user.age}
          value={user.age}>
          <Text h5>Age</Text>
        </Input>
        <div className='with-label userpage__userInfo-country-wrapper'>
          <div>
            <Text h5>Country</Text>
            <CountryDropdown
              className='userpage__userInfo-country'
              value={user.country}
              onChange={selectCountry}
            />
          </div>
          <div>
            <Text h5>Region</Text>
            <RegionDropdown
              className='userpage__userInfo-country'
              disableWhenEmpty={true}
              country={user.country}
              value={user.region}
              onChange={selectRegion}
            />
          </div>
        </div>
        <UserSocials isDataTouched={isDataTouched} setIsDataTouched={setIsDataTouched} />
        <div className='with-label userpage__userInfo_submit'>
          <Button
            shadow
            type='success'
            disabled={submitClicked || !isDataTouched}
            loading={submitClicked}
            htmlType='submit'>
            Save changes
          </Button>
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
      </form>
    </div>
  );
});

export default EditUserInfo;
