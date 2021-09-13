import React, { useContext } from 'react';
import { Avatar, Button, Spacer, Text, useToasts } from '@geist-ui/react';
import { Hexagon, Lambda, Octagon } from '@geist-ui/react-icons';
import './navbar.scss';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { UserContext } from '../..';

const Navbar = observer(() => {
  const user = useContext(UserContext);
  const [, setToast] = useToasts();
  const history = useHistory();

  const handleLogout = () => {
    try {
      localStorage.clear();
      user.reset();
      setToast({
        text: 'Logged out',
        type: 'secondary',
        delay: 5000,
      });
      history.push('/login');
    } catch (err) {
      console.warn(err);
      setToast({
        text: err,
        type: 'error',
        delay: 5000,
      });
    }
  };

  const renderName = () => {
    if (user.name) {
      if (user.lastName) {
        return `${user.name} ${user.lastName}`;
      }
      return user.name;
    }
    return user.email;
  };

  return (
    <div className='navbar'>
      <div className='navbar__header'>
        <NavLink to='/' style={{ color: 'inherit' }}>
          <Text h3 className='navbar__title'>
            Project name
          </Text>
        </NavLink>
      </div>
      <div />
      <div className='navbar__entry'>
        {user.isAuth ? (
          <>
            <Link style={{ color: 'inherit' }} to={`/user?id=${user._id}`}>
              <div style={{ display: 'flex' }}>
                {user.avatar && <Avatar src={user.avatar} />}
                <Spacer w={0.5} />
                <Text style={{ margin: 0 }}>{renderName()}</Text>
              </div>
            </Link>
            <Spacer w={2} />
            <Button
              icon={<Octagon />}
              auto
              type='abort'
              className='navbar__entry_logout'
              onClick={handleLogout}>
              Log out
            </Button>
          </>
        ) : (
          <>
            <NavLink to='login'>
              <Button icon={<Hexagon />} auto type='success' className='navbar__entry_login'>
                Login
              </Button>
            </NavLink>
            <NavLink to='registration'>
              <Button icon={<Lambda />} auto type='abort' className='navbar__entry_registration'>
                Sign Up
              </Button>
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
});

export default Navbar;
