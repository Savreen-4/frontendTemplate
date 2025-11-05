import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../../utlis/authService";
import { errorMessage, successMessage } from "../../../utlis/common";
import { SOME_WENT_WRONG } from "../../../utlis/messages";
import { setConfirmDeleteModal, setDetail } from "./companiesSlice";

export const FetchCompanies = createAsyncThunk(
  "FetchCompanies",
  async ({ page, usersPerPage, query = "" }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch,language).get(`admin/company?page=${page}&limit=${usersPerPage}&search=${query}`);
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const FetchCompanydetail = createAsyncThunk(
  "FetchCompanydetail",
  async ({ id }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch,language).get(`admin/company/${id}`);
      dispatch(setDetail(response.data.data))
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "deleteAccount",
  async ({ id, navigate }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).delete(`company/${id}`);
      successMessage(response?.data?.responseMessage)
      dispatch(FetchCompanies({ page: 1, usersPerPage:10 }))
      dispatch(setConfirmDeleteModal(false))
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);
