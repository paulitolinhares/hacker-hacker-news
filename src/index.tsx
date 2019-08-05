import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./state/reducer";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./state/sagas";
import "./assets/fonts/icons/styles.css";
import "./assets/fonts/inconsolata.css";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
