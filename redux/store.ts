// Vendor
import AsyncStorage from "@react-native-async-storage/async-storage"
import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from '@reduxjs/toolkit/query/react'

// Persist
import {
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// Slices
import authSlice from "./features/auth/authSlice"
import reportsSlice from "./features/reports/reportsSlice"

const persistConfig = {
	key: 'root',
	version: 1,
	storage: AsyncStorage,
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice)
const persistedReportsReducer = persistReducer(persistConfig, reportsSlice)

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		reports: persistedReportsReducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})


setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store