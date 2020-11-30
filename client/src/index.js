import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import todoReducer from './redux/reducers/todo';
import filterReducer from './redux/reducers/filters';

const rootReducer = combineReducers({
  todoRdcr: todoReducer,
  filterRdcr: filterReducer,
});

const logger = store => {
  return next => {
    return action => {
      const result = next(action);
      return result;
    }
  }
}

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
