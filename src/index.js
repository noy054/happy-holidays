import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AppProvider } from "./Hook/AppContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <App />
      </Router>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
