import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import videoReducer from "./videoSlice.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
// config to store redux store to local storage
const persistConfig = {
  key: "root",
  version: 1, // to implement changes made
  storage,
};
// combining reducers
const rootReducer = combineReducers({
  user: userReducer,
  video: videoReducer,
});
// warpping combined reducer with persist resistor
const persistedReducer = persistReducer(persistConfig, rootReducer);
// configuring redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
