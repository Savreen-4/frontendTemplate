import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../utlis/authService";
import { errorMessage, successMessage } from "../../utlis/common";
import { SOME_WENT_WRONG } from "../../utlis/messages";

export const FetchPolicyData = createAsyncThunk(
  "FetchPolicyData",
  async (values: void, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch,language).get(`policy`);
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPolocies = createAsyncThunk(
  "addPolocies",
  async ({ values, navigate }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch,language).post(
        `policy`,
        values);
      successMessage(response?.data?.responseMessage)
      return response.data;
    } catch (error: any) {
      console.error("Error in updateUserDetail:", error);
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG);
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);
