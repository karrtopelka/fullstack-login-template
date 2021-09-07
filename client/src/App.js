import './App.css';
import { Page } from '@geist-ui/react';
import { Footer, Login, Navbar, Registration } from './components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { auth } from './actions/user';

const App = observer(({ user }) => {
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
          <Navbar user={user} />
        </Page.Header>
        <Page.Content>
          <Switch>
            <Route path='/registration'>
              <Registration user={user} />
            </Route>
            <Route path='/login'>
              <Login user={user} />
            </Route>
            <Route path='/'>
              <h1>home page</h1>
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
