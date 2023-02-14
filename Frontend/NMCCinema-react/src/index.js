import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Context Provider
import { MaterialUIControllerProvider } from "context";
import store from "./redux/store/index";

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
