// import { configureStore } from '@reduxjs/toolkit';
// import { CustomerSilder } from "./customer";
// const store = configureStore({
//   reducer: {
//     customer: CustomerSilder.reducer,
//   },
// });

// export default store;

// export type RootState = ReturnType<typeof store.getState>;
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
export type IRootState = ReturnType<typeof userReducer>

// import chairReducer from './chair/chairSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // blacklist:['account/user']
}
const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user:userReducer,
    auth:persistedReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
const persistor = persistStore(store)
export {persistor}