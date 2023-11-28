import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducer from "./userReducer/Rootreducer";
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer);
const persistor = persistStore(store);

export default store;
