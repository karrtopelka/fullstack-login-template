import { Button, Card, Grid, Input, Spacer, Text, useToasts } from '@geist-ui/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../..';
import { registration } from '../../actions/user';
import './registration.scss';

const Registration = () => {
  const user = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [response, setResponse] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const [, setToast] = useToasts();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    const r = await registration(email, password, passwordConfirm);
    if (r) {
      setResponse(r);
      setToast({
        text: r.data.message,
        type: r.status !== 200 ? 'error' : 'success',
        delay: 5000,
      });
      if (r.status === 200) {
        user.setUser({ ...r.data.user, isAuth: true });
        history.push('/');
      }
    }
    setSubmitClicked(false);
  };

  const responseReseted = useRef(false);
  useEffect(() => {
    if (!responseReseted.current) {
      setResponse({});
      responseReseted.current = true;
    }

    return () => setResponse({});
  }, [email, password, passwordConfirm]);

  return (
    <Grid.Container justify='center'>
      <Grid>
        <Card width='auto' className='registration'>
          <Text h4 className='registration__title' align='center'>
            Registration
          </Text>
          <form onSubmit={handleSubmit} className='registration__form'>
            <Input
              pattern='^[\w\-\.]+@([\w\-]+\.)+[\w]*'
              clearable
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
              placeholder='email@email.com'
              width='100%'
            />
            <Spacer h={0.5} />
            <Input.Password
              clearable
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
              placeholder='*******'
              width='100%'
            />
            <Spacer h={0.5} />
            <Input.Password
              clearable
              hideToggle
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              label='Password confirm'
              placeholder='*******'
              width='100%'
            />
            <Spacer h={1} />
            <Button
              loading={submitClicked}
              disabled={submitClicked}
              auto
              type={response?.status >= 400 ? 'error' : 'success'}
              htmlType='submit'>
              Sign Up
            </Button>
          </form>
          <Card.Footer>
            <Link to='/login'>Already have account? Sign in!</Link>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default Registration;
