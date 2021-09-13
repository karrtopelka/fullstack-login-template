import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import 'inter-ui/inter.css';
import User from './stateHandler/User';
import { createContext } from 'react';

export const UserContext = createContext(User);

ReactDOM.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <UserContext.Provider value={new User()}>
        <App />
      </UserContext.Provider>
    </GeistProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
