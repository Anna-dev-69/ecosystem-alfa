import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./_variables.css";
import App from "./App";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { reducer } from "./store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = createStore(reducer);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
