import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import store from './store/index';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
