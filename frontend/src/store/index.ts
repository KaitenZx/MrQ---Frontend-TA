// frontend/src/store/index.ts

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import pricesSlice from './pricesSlice';
import selectedStockSlice from './selectedStockSlice';
import dashboardOptionsSlice from './dashboardOptionsSlice';
import { stocksApi } from '@/services/stocksApi';
import { priceHistoryApi } from '@/services/priceHistoryApi';

export const store = configureStore({
  reducer: {
    [pricesSlice.name]: pricesSlice.reducer,
    [dashboardOptionsSlice.name]: dashboardOptionsSlice.reducer,
    [selectedStockSlice.name]: selectedStockSlice.reducer,
    [stocksApi.reducerPath]: stocksApi.reducer, // RTK Query для Stocks
    [priceHistoryApi.reducerPath]: priceHistoryApi.reducer, // RTK Query для Price History
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(stocksApi.middleware)
      .concat(priceHistoryApi.middleware), // Добавляем RTK Query middleware
});

// Optional, но требуется для refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
