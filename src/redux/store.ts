import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './slices/querySlice';

export const store = configureStore({
  reducer: {
    query: queryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;