import { createStore, applyMiddleware } from 'redux'
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';

const client = axios.create({
  baseURL: 'http://funny.kimvex.com/api',
  responseType: 'json'
})

import states from './states'
import reducer from './reducer'

const store = createStore(
  reducer,
  states,
  applyMiddleware(
    thunk,
    axiosMiddleware(client)
  )
)

module.exports = store
