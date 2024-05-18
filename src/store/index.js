import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../slice/authSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  authReducer: authSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["isLoading"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
