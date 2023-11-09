import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ['Auth']
};

//Middleware
const middlewwares = [];
middlewwares.push(thunk);

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(...middlewwares));
let persistor = persistStore(store);

// Exports
export {
    store,
    persistor,
};