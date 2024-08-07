import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import hashReducer from "./hashSlice";

import storage from "redux-persist/lib/storage";

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

const cartPersistConfig = {
  key: "cart",
  storage,
  version: 1,
};

const userPersistConfig = {
  key: "auth",
  storage,
  version: 1,
  wishlist: ["auth"],
};

const hashPersistConfig = {
  key: "hash",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(cartPersistConfig, cartReducer);

const userPersistedReducer = persistReducer(userPersistConfig, userReducer);

const hashPersistedReducer = persistReducer(hashPersistConfig, hashReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    auth: userPersistedReducer,
    hash: hashPersistedReducer,
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
