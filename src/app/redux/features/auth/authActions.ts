import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../../utlis/authService";
import { errorMessage, successMessage } from "../../../utlis/common";
import { SOME_WENT_WRONG } from "../../../utlis/messages";
import { setEmail, setOtpStage } from "./authSlice";

const ADMIN_LOGIN_URL = `admin/login`
const ADMIN_LOGOUT_URL = `common/logout`

export const login = createAsyncThunk(
  "auth/login",
  async ({ values, navigate }: any, { rejectWithValue, dispatch, getState }) => {
    try {      
      const response = await customAxios('application/json', dispatch).post(ADMIN_LOGIN_URL, values);
     if(response.status === 200){
        successMessage(response.data?.responseMessage)
      } else {       
        errorMessage(response.data?.responseMessage || SOME_WENT_WRONG)
      }
      
      return response.data;
    } catch (error: any) {     
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (values: void, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).put(ADMIN_LOGOUT_URL, {});
      localStorage.removeItem('token');
      // window.location.href = '/';
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const SendAdminPasswordAction = createAsyncThunk(
  "SendAdminPasswordAction",
  async (values: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).post('/admin/send-reset-password-otp', values);
      successMessage(response?.data?.responseMessage)
      dispatch(setOtpStage(true));
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const ConfirmResetAction = createAsyncThunk(
  "SendAdminPasswordAction",
  async (values: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).post('/admin/confirm-reset-password', values);
      successMessage(response?.data?.responseMessage)
      dispatch(setOtpStage(false));
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

