import { createSlice } from "@reduxjs/toolkit";
import { FetchVehicleTypes } from "./vehicleTypesAction";
import { CURRENT_PAGE, LIMIT } from "../../../../_metronic/helpers";


const initialState:any = {
  vehicleTypes: [],
  loading: false,
  pagination: {},
  selectedUser: {},
  showConfirmModal: false,
  usersPerPage:LIMIT,
  currentPage:CURRENT_PAGE,
  confirmDeleteModal: false,
  vehicleDetail:{},
};

const VehicleTypes = createSlice({
  name: 'vehicleTypesSlice',
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
      .addCase(FetchVehicleTypes.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchVehicleTypes.fulfilled, (state: any, { payload }: any) => {
        state.vehicleTypes = payload.data
        state.pagination = payload.pagination
        state.loading = false

      })
      .addCase(FetchVehicleTypes.rejected, (state: any, action: any) => {
        state.loading = false;
      })

  }
});

export const {setDetail,setConfirmDeleteModal} = VehicleTypes.actions;
export const vehicleTypesReducer = VehicleTypes.reducer;
