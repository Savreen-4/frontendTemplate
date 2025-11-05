import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../../utlis/authService";
import { errorMessage, successMessage } from "../../../utlis/common";
import { SOME_WENT_WRONG } from "../../../utlis/messages";
import { confirmAccountVerificationModal, setConfirmDeleteModal, setDetail } from "./driverSlice";

export const FetchDrivers = createAsyncThunk(
  "FetchDrivers",
  async ({ page, usersPerPage }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch, language).get(`admin/drivers?page=${page}&limit=${usersPerPage}`);
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchDriverdetail = createAsyncThunk(
  "FetchDriverdetail",
  async ({ id }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch, language).get(`admin/driver/${id}`);
      dispatch(setDetail(response.data.data))
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyAccount = createAsyncThunk(
  "verifyAccount",
  async ({ id, navigate }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).put(`admin/driver/accountVerification/${id}`);
      dispatch(setDetail(response.data.data))
      successMessage(response?.data?.responseMessage)
      dispatch(confirmAccountVerificationModal(false));
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "deleteAccount",
  async ({ id, navigate }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).delete(`driver/${id}`);
      successMessage(response?.data?.responseMessage)
      dispatch(FetchDrivers({ page: 1, usersPerPage:10 }))
      dispatch(setConfirmDeleteModal(false))
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);
