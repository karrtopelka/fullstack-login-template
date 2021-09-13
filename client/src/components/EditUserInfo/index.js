import { Button, Dot, Input, Text, Tooltip, useToasts } from '@geist-ui/react';
import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useHistory } from 'react-router';
import { UserContext } from '../..';
import { infoUpdate } from '../../actions/user';

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
      <div className='userpage__userInfo_header'>
        <Text h3>Edit your information</Text>
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
          onChange={(e) => user.setLastName(e.target.value)}
          placeholder={user.lastName}
          value={user.lastName}>
          <Text h5>Last name</Text>
        </Input>
        <Input
          htmlType='url'
          onChange={(e) => user.setAvatar(e.target.value)}
          placeholder={user.avatar}
          value={user.avatar}>
          <Text h5>Avatar (url)</Text>
        </Input>
        <Input
          min={0}
          max={100}
          htmlType='number'
          onChange={(e) => user.setAge(e.target.value)}
          placeholder={user.age}
          value={user.age}>
          <Text h5>Age</Text>
        </Input>
        <div className='userpage__userInfo_countryWrapper'>
          <div>
            <Text h5>Country</Text>
            <CountryDropdown
              className='userpage__userInfo_country'
              value={user.country}
              onChange={selectCountry}
            />
          </div>
          <div>
            <Text h5>Region</Text>
            <RegionDropdown
              className='userpage__userInfo_country'
              disableWhenEmpty={true}
              country={user.country}
              value={user.region}
              onChange={selectRegion}
            />
          </div>
        </div>
        <div className='with-label userpage__userInfo_submit'>
          <div />
          <Button
            shadow
            type='success'
            disabled={submitClicked}
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

export default EditUserInfo;
