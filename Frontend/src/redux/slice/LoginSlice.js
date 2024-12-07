import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  loader: false,
  user:null,
  isAuthenticated: false,
  role: null,
};


export const loginAsync = createAsyncThunk(
  'login/loginAsync',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://mechine-task-leave-management.onrender.com/user_authentication/token/`, loginData);
      const tokens = { access: response?.data?.access, refresh: response?.data?.refresh };
      localStorage.setItem('LeaveTrackTokens', JSON.stringify(tokens));
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
        state.loader = false;
        state.isAuthenticated = false;
        state.user = null;
        state.role = null;
        localStorage.removeItem('LeaveTrackTokens');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loader = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loader = false;
        state.isAuthenticated = true;
        state.role = action?.payload?.role;
        state.user = action?.payload?.email;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loader = false;
        state.isAuthenticated = false;
        state.role = null;
      })
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;


