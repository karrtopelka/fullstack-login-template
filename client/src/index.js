import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GeistProvider, CssBaseline } from '@geist-ui/react';
import 'inter-ui/inter.css';
import User from './stateHandler/User';

const user = new User();

ReactDOM.render(
  <React.StrictMode>
    <GeistProvider>
      <CssBaseline />
      <App user={user} />
    </GeistProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
