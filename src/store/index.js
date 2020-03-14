import {createStore, applyMiddleware} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import api from '~/services/api';

import reducers from './ducks/reducers';

const store = createStore(reducers, applyMiddleware(axiosMiddleware(api)));

export default store;
