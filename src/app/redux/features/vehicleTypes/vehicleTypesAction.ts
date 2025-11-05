import { createAsyncThunk } from "@reduxjs/toolkit";
import { customAxios } from "../../../utlis/authService";
import { errorMessage, successMessage } from "../../../utlis/common";
import { SOME_WENT_WRONG } from "../../../utlis/messages";
import { setConfirmDeleteModal, setDetail } from "./vehicleTypesSlice";

export const FetchVehicleTypes = createAsyncThunk(
  "FetchVehicleTypes",
  async ({ page, usersPerPage, query = "" }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch, language).get(`vehicle-types?page=${page}&limit=${usersPerPage}&search=${query}`);
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVehicleType = createAsyncThunk(
  "deleteVehicleType",
  async ({ id }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).delete(`vehicle-types/${id}`);
      successMessage(response?.data?.responseMessage)
      dispatch(setDetail({}))
      dispatch(setConfirmDeleteModal(false))
      dispatch(FetchVehicleTypes({ page: 1, usersPerPage:10 }))
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVehicleType = createAsyncThunk(
  "addVehicleType",
  async ({ values, navigate }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await customAxios('application/json', dispatch).post(`vehicle-types`,values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      successMessage(response?.data?.responseMessage)
      navigate('/vehicleTypes')
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVehicleType = createAsyncThunk(
  "updateVehicleType",
  async ({ values,id, navigate }: any, { rejectWithValue, dispatch, getState }) => {
    try {
      const state: any = getState();
      const language = state?.app?.language || 'en';
      const response = await customAxios('application/json', dispatch,language).put(`vehicle-types/${id}`,values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      successMessage(response?.data?.responseMessage)
      navigate('/vehicleTypes')
      return response.data;
    } catch (error: any) {
      errorMessage(error?.response?.data?.responseMessage || SOME_WENT_WRONG)
      return rejectWithValue(error.response.data);
    }
  }
);