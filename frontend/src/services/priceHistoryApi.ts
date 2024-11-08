import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type HistoryEntry = {
	time: number;
	price: number;
};

type PriceHistoryResponse = {
	symbol: string | null;
	history: HistoryEntry[];
};

export const priceHistoryApi = createApi({
	reducerPath: 'priceHistoryApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3100/api/' }),
	tagTypes: ['PriceHistory'],
	endpoints: (builder) => ({
		getPriceHistory: builder.query<PriceHistoryResponse, string>({
			query: (symbolId) => `stock/history/${symbolId}`,
			providesTags: (result, error, symbolId) => [{ type: 'PriceHistory', id: symbolId }],
		}),
	}),
});

export const { useGetPriceHistoryQuery } = priceHistoryApi;
