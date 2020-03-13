import React from 'react';

import '~/config/ReactotronConfig';

import {Provider} from 'react-redux';
import store from './store';

import Routes from '~/routes';
import {REACT_APP_GOOGLE_API_KEY} from 'react-native-dotenv';

console.log('API');
console.log(REACT_APP_GOOGLE_API_KEY);

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default App;
