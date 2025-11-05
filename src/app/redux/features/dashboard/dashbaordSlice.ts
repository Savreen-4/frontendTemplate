import { createSlice } from "@reduxjs/toolkit";
import { FetchDashboardData } from "./dashbaordAction";
import { CURRENT_PAGE, LIMIT } from "../../../../_metronic/helpers";

const initialState:any = {
  dashboard: [],
  loading: false,
  pagination: {},
  showConfirmModal: false,
  usersPerPage:LIMIT,
  currentPage:CURRENT_PAGE
};

const dashboard = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    updateUserStatus: (state, { payload }) => {
      state.users = state.users.map((user: any) =>
        user._id === payload.id
          ? { ...user, isBlocked: payload.isBlocked }
          : user 
      );
      state.showConfirmModal = false
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(FetchDashboardData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchDashboardData.fulfilled, (state: any, { payload }: any) => {
        console.log(payload.data)
        state.dashboard = payload.data
        // state.pagination = payload.pagination
        state.loading = false
      })
      .addCase(FetchDashboardData.rejected, (state: any, action: any) => {
        state.loading = false;
      })
  }
});

export const dashboardReducer = dashboard.reducer;
