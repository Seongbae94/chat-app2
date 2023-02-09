import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "remixicon/fonts/remixicon.css";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);
