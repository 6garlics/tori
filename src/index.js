import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Grade from "grade-js";
import { Provider } from "react-redux";
import { store } from "./redux/store";

window.addEventListener("load", function () {
  Grade(document.querySelectorAll(".gradient-wrap"));
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
