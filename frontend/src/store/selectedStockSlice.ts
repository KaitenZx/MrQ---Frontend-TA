// frontend/src/store/selectedStockSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedStockState {
	selectedStockId: string | null;
}

const initialState: SelectedStockState = {
	selectedStockId: null,
};

const selectedStockSlice = createSlice({
	name: 'selectedStock',
	initialState,
	reducers: {
		selectStock(state, action: PayloadAction<string>) {
			state.selectedStockId = action.payload;
		},
		deselectStock(state) {
			state.selectedStockId = null;
		},
	},
});

export const { selectStock, deselectStock } = selectedStockSlice.actions;
export default selectedStockSlice;
