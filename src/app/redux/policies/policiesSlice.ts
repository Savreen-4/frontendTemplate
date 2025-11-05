import { createSlice } from "@reduxjs/toolkit";
import { FetchPolicyData } from "./policiesAction";

const initialState:any = {
  policyData: {},
  loading: false
};

const policyData = createSlice({
  name: 'policyDataSlice',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(FetchPolicyData.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(FetchPolicyData.fulfilled, (state: any, { payload }: any) => {
        state.policyData = payload.data
        state.pagination = payload.pagination
        state.loading = false
      })
      .addCase(FetchPolicyData.rejected, (state: any, action: any) => {
        state.loading = false;
      })
  }
});

export const policyDataReducer = policyData.reducer;
