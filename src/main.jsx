import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./css/App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ChatRoutes from "./routers/ChatRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatRoutes/>
    </BrowserRouter>
  </React.StrictMode>
);
