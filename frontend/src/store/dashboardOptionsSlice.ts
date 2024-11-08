import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '.';

interface DashboardOptionsState {
  showCardInfo: boolean;
}

const initialState: DashboardOptionsState = {
  showCardInfo: true
};

export const dashboardOptionsSlice = createSlice({
  name: 'dashboardOptions',
  initialState,
  reducers: {
    toggleShowCardInfo: (state) => {
      state.showCardInfo = !state.showCardInfo;
    }
  }
});

export const { toggleShowCardInfo } = dashboardOptionsSlice.actions;

export const selectShowCardInfo = (state: RootState) => state.dashboardOptions.showCardInfo;

export default dashboardOptionsSlice;
