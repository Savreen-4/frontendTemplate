import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../../utlis/authService";
import { errorMessage, successMessage } from "../../../utlis/common";
import { SOME_WENT_WRONG } from "../../../utlis/messages";
import { setConfirmDeleteModal, setDetail } from "./jobsSlice";

export const FetchComapnyJobs = createAsyncThunk(
  "FetchComapnyJobs",
  async ({ page, usersPerPage, query = "", id }: any, { rejectWithValue, dispatch, getState }) => {
    try {      
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch, language).get(`job/createdByCompany/${id}?page=${page}&limit=${usersPerPage}&search=${query}`);
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchDriverJobs = createAsyncThunk(
  "FetchDriverJobs",
  async ({ page, usersPerPage, query = "", id }: any, { rejectWithValue, dispatch, getState }) => {
    try {      
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch, language).get(`job/driverAllJobs/${id}?page=${page}&limit=${usersPerPage}&search=${query}`);
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);