import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import store from './redux/store';

import Layout from './views/layout/layout';

/* reset.css */
import './assets/styles/reset.css';
import './assets/styles/custom.less';

/* rem计算适配移动端 */
import './utils/rem';

/* fixed mobile click 300ms delay */
const FastClick = require('fastclick');
FastClick.attach(document.body)

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <Layout />
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)

registerServiceWorker();
