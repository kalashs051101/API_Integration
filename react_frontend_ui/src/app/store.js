import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userAuthApi } from '../services/userAuthApi'
import authSlice from '../features/authSlice'
import userSlice from '../features/userSlice'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    auth:authSlice,
    user:userSlice
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userAuthApi.middleware),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)