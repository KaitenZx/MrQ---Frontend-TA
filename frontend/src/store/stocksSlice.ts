import { createAsyncThunk, createSlice, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

type Stock = {
  symbol: string;
  companyName: string;
  industry: string;
  marketCap: number;
  exchange: 'NASDAQ' | 'NYSE';
  trend: 'UP' | 'DOWN' | null;
};

const stocksAdapter = createEntityAdapter<Stock>({
  selectId: (stock) => stock.symbol,
});

type StocksState = EntityState<Stock> & {
  apiState: {
    loading: boolean | null;
    error: boolean;
  };
};

const initialState: StocksState = stocksAdapter.getInitialState({
  apiState: {
    loading: null,
    error: false,
  },
});

export const fetchAllStocks = createAsyncThunk(
  'stocks/fetchAllStocks',
  async () => {
    const response = await fetch(`http://localhost:3100/api/stocks`);
    if (!response.ok) {
      throw new Error('Failed to fetch stocks');
    }
    return (await response.json()) as Stock[];
  }
);

// Существующие селекторы
const selectStockIds = (state: RootState) => state.stocks.ids;
const selectStocks = (state: RootState) => state.stocks.entities;
const apiState = (state: RootState) => state.stocks.apiState;

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStocks.pending, (state) => {
        state.apiState.loading = true;
        state.apiState.error = false;
      })
      .addCase(fetchAllStocks.fulfilled, (state, action) => {
        stocksAdapter.setAll(state, action.payload);
        state.apiState.loading = false;
        state.apiState.error = false;
      })
      .addCase(fetchAllStocks.rejected, (state) => {
        state.apiState.loading = false;
        state.apiState.error = true;
      });
  },
});

// Экспортируем адаптерные селекторы
export const {
  selectAll: selectAllStocks,
  selectById: selectStockById,
  selectIds: selectStockIdsAdapter,
} = stocksAdapter.getSelectors<RootState>((state) => state.stocks);

// Экспортируем существующие селекторы (не изменяем их)
export const selectors = {
  selectStockIds,
  selectStocks,
  apiState,
};

export default stocksSlice;
