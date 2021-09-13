import React, { useContext } from 'react';
import './App.css';
import { Page } from '@geist-ui/react';
import { Navbar, Footer, Registration, Login, Home, UserPage } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { auth } from './actions/user';
import { UserContext } from '.';

const App = observer(() => {
  const user = useContext(UserContext);

  useEffect(() => {
    const authenticate = async () => {
      const authentication = await auth();
      if (authentication?.status === 200) {
        user.setUser(authentication.data.user);
      }
    };

    authenticate();
  }, [user]);

  return (
    <Router>
      <Page>
        <Page.Header>
          <Navbar />
        </Page.Header>
        <Page.Content>
          <Switch>
            <Route path='/registration'>
              <Registration />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/user'>
              <UserPage />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Page.Content>
        <Page.Footer>
          <Footer />
        </Page.Footer>
      </Page>
    </Router>
  );
});

export default App;
