import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../utlis/authService";
import { errorMessage } from "../../utlis/common";
import { SOME_WENT_WRONG } from "../../utlis/messages";

export const FetchContactUSListing = createAsyncThunk(
  "FetchContactUSListing",
  async ({ page, usersPerPage }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).get(`contactUs?page=${page}&limit=${usersPerPage}`);
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);
