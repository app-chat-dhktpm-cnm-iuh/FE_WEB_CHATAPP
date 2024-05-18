import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import "./css/App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ChatRoutes from "./routers/ChatRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChatRoutes />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
