import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import hashReducer from "./hashSlice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";

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

const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const session =
  typeof window !== "undefined"
    ? createWebStorage("session")
    : createNoopStorage();

const cartPersistConfig = {
  key: "cart",
  storage,
  version: 1,
};

const userPersistConfig = {
  key: "auth",
  storage: session,
  version: 1,
};

const hashPersistConfig = {
  key: "hash",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(cartPersistConfig, cartReducer);

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

// const hashPersistedReducer = persistReducer(hashPersistConfig, hashReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    auth: userPersistedReducer,
    // hash: hashPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
