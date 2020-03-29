import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from 'redux-thunk';

// All reducers
import { tabReducer } from './actions/tab.action'
import { authReducer } from './actions/auth.action'
import { eventsReducer } from './actions/events.action'
import { popupReducer } from './actions/popup.action'
import { loaderReducer } from './actions/loader.action'

// Secure storage
const config = {
  key: "root",
  storage: ExpoFileSystemStorage,
  blacklist: ['tabReducer']
};

// Create store by combining reducers
const reducers = persistCombineReducers(config, {
  tabReducer,
  
  authReducer,
  eventsReducer,

  loaderReducer,
  popupReducer,
});

const store = createStore(reducers, applyMiddleware(thunk))
const persistor = persistStore(store)
export { store, persistor }
