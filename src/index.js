import React from 'react';
import ReactDOM from 'react-dom';


import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'

import createSagaMiddleware from 'redux-saga';
import * as serviceWorker from './serviceWorker';

import './index.scss';
import './App.scss';

import App from './components/App';

import rootSaga from './redux/sagas/rootSaga';
import rootReducer from './redux/reducers/rootReducer';

import storage from 'redux-persist/lib/storage'
 
 
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['rates']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const sagaMiddleware = createSagaMiddleware();
const store = createStore(persistedReducer, compose(applyMiddleware(sagaMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
