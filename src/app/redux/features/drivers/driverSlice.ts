import { createSlice } from "@reduxjs/toolkit";
import { FetchDrivers } from "./driverAction";
import { CURRENT_PAGE, LIMIT } from "../../../../_metronic/helpers";

const initialState:any = {
  drivers: [],
  loading: false,
  pagination: {},
  showConfirmModal: false,
  usersPerPage:LIMIT,
  currentPage:CURRENT_PAGE,
  driverDetail:{},
  confirmAccountVerification: false,
  confirmDeleteModal: false,
};

const drivers = createSlice({
  name: 'driverSlice',
  initialState,
  reducers: {
    updateUserStatus: (state, { payload }) => {
      state.users = state.users.map((user: any) =>
        user._id === payload.id
          ? { ...user, isBlocked: payload.isBlocked }
          : user 
      );
      state.showConfirmModal = false
    },
    setDetail: (state, { payload }) => {
      state.driverDetail = payload
    },
    confirmAccountVerificationModal: (state, {payload}) => {
      state.confirmAccountVerification = payload;
    },
    setConfirmDeleteModal: (state, {payload}) => {
      state.confirmDeleteModal = payload;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(FetchDrivers.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchDrivers.fulfilled, (state: any, { payload }: any) => {
        console.log(payload.data)
        state.drivers = payload.data
        state.pagination = payload.pagination
        state.loading = false
      })
      .addCase(FetchDrivers.rejected, (state: any, action: any) => {
        state.loading = false;
      })
  }
});

export const {setDetail,confirmAccountVerificationModal,setConfirmDeleteModal} = drivers.actions;
export const driversReducer = drivers.reducer;
