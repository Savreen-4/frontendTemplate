import { createSlice } from "@reduxjs/toolkit";
import { FetchContactUSListing } from "./contactusAction";
import { CURRENT_PAGE, LIMIT } from "../../../_metronic/helpers";

const initialState:any = {
  contactus: [],
  loading: false,
  pagination: {},
  showConfirmModal: false,
  usersPerPage:LIMIT,
  curentPage:CURRENT_PAGE,
};

const contactus = createSlice({
  name: 'contactusSlice',
  initialState,
  reducers: {
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(FetchContactUSListing.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchContactUSListing.fulfilled, (state: any, { payload }: any) => {
        state.contactus = payload.data.contacts
        state.pagination = payload.pagination
        state.loading = false

      })
      .addCase(FetchContactUSListing.rejected, (state: any, action: any) => {
        state.loading = false;
      })

  }
});
export const contactusReducer = contactus.reducer;
