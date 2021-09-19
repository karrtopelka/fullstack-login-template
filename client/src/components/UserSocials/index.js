import { Button, Input, Spacer, Text } from '@geist-ui/react';
import { Plus, X } from '@geist-ui/react-icons';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { UserContext } from '../..';

const UserSocials = observer(({ setIsDataTouched }) => {
  const user = useContext(UserContext);

  const handleSocials = (action, index, value) => {
    if (action === 'remove') {
      const newSocials = toJS(user.socials);
      newSocials.splice(index, 1);

      return user.setSocials(newSocials);
    }

    if (action === 'edit') {
      setIsDataTouched(() => true);
      const newSocials = toJS(user.socials);
      newSocials[index] = value;

      return user.setSocials(newSocials);
    }

    user.setSocials([...toJS(user.socials), '']);

    return setIsDataTouched(() => true);
  };

  const handleDisableAddition = (array, value, valueIndex) => {
    if (array.some((item, ind, a) => a.indexOf(value) !== valueIndex && item === value)) {
      setIsDataTouched(() => false);
      return true;
    }
  };

  if (!toJS(user.socials).length) {
    return (
      <div className='with-label'>
        <Text h5>Socials (Add up to 3 social links)</Text>
        <div className='userpage__userInfo-socials-single'>
          <Button iconRight={<Plus />} onClick={() => handleSocials()}>
            Add Social Link
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='with-label userpage__userInfo-socials'>
      <Text h5>Social urls (add up to 3 social links)</Text>
      {toJS(user.socials).map((social, i, arr) => (
        <div key={i} className='userpage__userInfo-socials-multi'>
          <Input
            type={handleDisableAddition(arr, social, i) && 'error'}
            htmlType='url'
            value={social}
            onChange={(e) => handleSocials('edit', i, e.target.value)}
            placeholder='Social URL'
          />
          {arr.length - 1 === i && arr.length < 3 && (
            <>
              <Spacer w={0.5} />
              <Button
                disabled={!arr[i].length || handleDisableAddition(arr, social, i)}
                iconRight={<Plus />}
                auto
                scale={3 / 4}
                onClick={() => handleSocials('add', i)}
              />
            </>
          )}
          <Spacer w={0.5} />
          <Button
            iconRight={<X color='red' />}
            auto
            scale={3 / 4}
            onClick={() => handleSocials('remove', i)}
          />
        </div>
      ))}
    </div>
  );
});

export default UserSocials;
