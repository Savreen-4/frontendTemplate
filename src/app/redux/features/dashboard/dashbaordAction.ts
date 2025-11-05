import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../../utlis/authService";

export const FetchDashboardData = createAsyncThunk(
  "FetchDashboardData",
  async (values: void, { rejectWithValue, dispatch }) => {
    try {
      const response = await customAxios('application/json', dispatch).get(`admin/dashboard-counts`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);