// frontend/src/services/stocksApi.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

// Определяем типы данных
export type Stock = {
  symbol: string;
  companyName: string;
  industry: string;
  marketCap: number;
  exchange: 'NASDAQ' | 'NYSE';
  trend: 'UP' | 'DOWN' | null;
};

// Создаем Entity Adapter для нормализации данных
const stocksAdapter = createEntityAdapter<Stock>({
  selectId: (stock) => stock.symbol,
  sortComparer: (a, b) => a.symbol.localeCompare(b.symbol),
});

// Инициализируем начальное состояние с помощью адаптера
const initialState = stocksAdapter.getInitialState();

// Создаем API Slice
export const stocksApi = createApi({
  reducerPath: 'stocksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3100/api/' }),
  tagTypes: ['Stock'],
  endpoints: (builder) => ({
    getAllStocks: builder.query<ReturnType<typeof stocksAdapter.setAll>, void>({
      query: () => 'stocks',
      transformResponse: (responseData: Stock[]) => {
        // Нормализуем данные с помощью адаптера
        return stocksAdapter.setAll(initialState, responseData);
      },
      providesTags: (result) =>
        result
          ? [
            ...result.ids.map((id) => ({ type: 'Stock' as const, id })),
            { type: 'Stock', id: 'LIST' },
          ]
          : [{ type: 'Stock', id: 'LIST' }],
    }),
  }),
});

// Экспортируем hooks для использования в компонентах
export const { useGetAllStocksQuery } = stocksApi;

// Создаем селекторы для доступа к нормализованным данным
const selectStocksResult = stocksApi.endpoints.getAllStocks.select();

// Создаем мемоизированный селектор для получения данных или начального состояния
const selectStocksData = createSelector(
  selectStocksResult,
  (stocksResult) => stocksResult.data ?? initialState
);

// Экспортируем адаптерные селекторы
export const {
  selectAll: selectAllStocks,
  selectById: selectStockById,
  selectIds: selectStockIdsAdapter,
} = stocksAdapter.getSelectors<RootState>((state) => selectStocksData(state));
