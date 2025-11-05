import { createSlice } from "@reduxjs/toolkit";
import { FetchCompanies } from "./companiesAction";
import { CURRENT_PAGE, LIMIT } from "../../../../_metronic/helpers";


const initialState: any = {
  companies: [],
  loading: false,
  pagination: {},
  selectedUser: {},
  showConfirmModal: false,
  usersPerPage: LIMIT,
  currentPage: CURRENT_PAGE,
  confirmDeleteModal: false,
  companyDetail: {},
};

const Companies = createSlice({
  name: 'companySlice',
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
      state.companyDetail = payload
    },
    setConfirmDeleteModal: (state, { payload }) => {
      state.confirmDeleteModal = payload;
    }

  },
  extraReducers: (builder: any) => {
    builder
      .addCase(FetchCompanies.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchCompanies.fulfilled, (state: any, { payload }: any) => {
        state.companies = payload.data
        state.pagination = payload.pagination
        state.loading = false

      })
      .addCase(FetchCompanies.rejected, (state: any, action: any) => {
        state.loading = false;
      })

  }
});

export const { setDetail, setConfirmDeleteModal } = Companies.actions;
export const companiesReducer = Companies.reducer;
