import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./UserSlice";
import ThemeSliceReducer from "./ThemeSlice"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import { getDefaultMiddleware } from '@reduxjs/toolkit';


const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const rootReducers = combineReducers({
    user: UserSliceReducer,
    theme : ThemeSliceReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false,
    })
})

const persistor = persistStore(store)

export { store, persistor }