import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from "redux";
import reducer from "./store/reducer";
import createSagaMiddleware from 'redux-saga';
import mySaga from './store/sagas'

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({ myApp: reducer });
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
