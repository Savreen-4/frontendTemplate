import { createSlice } from "@reduxjs/toolkit";
import { FetchComapnyJobs, FetchDriverJobs } from "./jobsAction";
import { CURRENT_PAGE, LIMIT } from "../../../../_metronic/helpers";


const initialState:any = {
  companyJobs: [],
  driverJobs: [],
  loading: false,
  pagination: {},
  selectedUser: {},
  showConfirmModal: false,
  usersPerPage:LIMIT,
  currentPage:CURRENT_PAGE,
  confirmDeleteModal: false,
};

const companyJobs = createSlice({
  name: 'companyJobsSlice',
  initialState,
  reducers: {
    setDetail: (state, { payload }) => {
      state.vehicleDetail = payload
    },
    setConfirmDeleteModal: (state, {payload}) => {
      state.confirmDeleteModal = payload;
    },

  },
  extraReducers: (builder: any) => {
    builder
      .addCase(FetchComapnyJobs.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchComapnyJobs.fulfilled, (state: any, { payload }: any) => {
        state.companyJobs = payload.data
        state.pagination = payload.pagination
        state.loading = false

      })
      .addCase(FetchComapnyJobs.rejected, (state: any, action: any) => {
        state.loading = false;
      })

  }
});


const driverJobs = createSlice({
  name: 'driverJobsSlice',
  initialState,
  reducers: {
    setDetail: (state, { payload }) => {
      state.vehicleDetail = payload
    },
    setConfirmDeleteModal: (state, {payload}) => {
      state.confirmDeleteModal = payload;
    },

  },
  extraReducers: (builder: any) => {
    builder
      .addCase(FetchDriverJobs.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchDriverJobs.fulfilled, (state: any, { payload }: any) => {
        state.driverJobs = payload.data
        state.pagination = payload.pagination
        state.loading = false

      })
      .addCase(FetchDriverJobs.rejected, (state: any, action: any) => {
        state.loading = false;
      })
  }
});

export const {setDetail,setConfirmDeleteModal} = companyJobs.actions;
export const companyJobsReducer = companyJobs.reducer;
export const driverJobsReducer = driverJobs.reducer;
