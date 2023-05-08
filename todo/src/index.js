import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from "axios";
import {Provider} from "react-redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import {createStore,applyMiddleware, compose} from "redux";
import reducres from "./reducers"
const store = createStore(reducres,composeWithDevTools(applyMiddleware(thunk)),window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_())

ReactDOM.render(
  <React.StrictMode>
   <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

