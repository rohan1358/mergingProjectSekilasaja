import React, { useContext } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// Webapp
import App from "./App";

// Redux
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";

// Google
import TagManager from "react-gtm-module";
import ReactGA from "react-ga";

// Internet Browsers
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

// Whole website color
document.body.style = "background: #FFFEF8;";

// Google Tag Manager
const tagManagerArgs = {
  gtmId: "GTM-5CD4PVH",
};
TagManager.initialize(tagManagerArgs);

// Google Analytics
const trackingId = "UA-207035025-1"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

// // Disable Inspect
// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });

document.onkeydown = function (e) {
  if (e.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
