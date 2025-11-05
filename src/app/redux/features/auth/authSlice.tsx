import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";


const initialState = {
  name: null,
  token: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  userDetails: { email: '' },
  otpStage:false
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutLocalDetails: (state) => {
      state.name = null
      state.token = null
      state.error = null
      state.loading = false
      state.isAuthenticated = false
    },

    setEmail: (state, { payload }) => {
      state.userDetails['email'] = payload
    },
    setOtpStage: (state, { payload }) => {
      state.otpStage = payload
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(login.pending, (state: any) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state: any, action: any) => {
        const { name, accessToken } = action.payload.data;
        localStorage.setItem('token', accessToken);
        state.loading = false
        state.isAuthenticated = true
        state.token = accessToken
        state.name = name
      })
      .addCase(login.rejected, (state: any, action: any) => {
        state.loading = false;
        state.error = action?.payload?.error;
      })
  }
});


export const { logoutLocalDetails, setEmail, setOtpStage } = authSlice.actions;
export const authReducer = authSlice.reducer;