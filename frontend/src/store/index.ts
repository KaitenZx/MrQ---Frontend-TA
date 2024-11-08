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
    [stocksApi.reducerPath]: stocksApi.reducer,
    [priceHistoryApi.reducerPath]: priceHistoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(stocksApi.middleware)
      .concat(priceHistoryApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
