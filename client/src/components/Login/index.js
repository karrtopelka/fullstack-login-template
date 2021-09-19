import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Card, Grid, Input, Spacer, Text, useToasts } from '@geist-ui/react';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../../actions/user';
import './login.scss';
import { UserContext } from '../..';

const Login = () => {
  const user = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState({});
  const [submitClicked, setSubmitClicked] = useState(false);
  const [, setToast] = useToasts();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitClicked(true);
    const r = await login(email, password);
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
  }, [email, password]);

  return (
    <Grid.Container justify='center'>
      <Grid>
        <Card width='auto' className='login'>
          <Text h4 className='login__title' align='center'>
            Login
          </Text>
          <form onSubmit={handleSubmit} className='login__form'>
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
            <Spacer h={1} />
            <Button
              loading={submitClicked}
              disabled={submitClicked}
              auto
              type={response?.status >= 400 ? 'error' : 'success'}
              htmlType='submit'>
              Login
            </Button>
          </form>
          <Card.Footer>
            <Link to='/registration'>Don&apos;t have account yet? Sign up!</Link>
          </Card.Footer>
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default Login;
