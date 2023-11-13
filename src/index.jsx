import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
