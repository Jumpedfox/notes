import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// @ts-ignore
import interfaceSlice from './reducers/index.ts';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['interfaceSlice'] // сохраняем только состояние интерфейса
};

const rootReducer = combineReducers({
  interfaceSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);