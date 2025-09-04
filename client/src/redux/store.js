import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sectionReducer from "./section/sectionSlice";

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,  // 👈 added
   section: sectionReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['user', 'theme'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
