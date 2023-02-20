import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Switch, Route } from 'react-router-dom';
import AppContainer from './containers/App/App.jsx';

import './static/css/global-styles.scss?raw';
import configureStore from './redux/store';


const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Switch>
      <Route path="/" component={AppContainer} />
    </Switch>
  </Provider>
  , document.getElementById('root'),
);
