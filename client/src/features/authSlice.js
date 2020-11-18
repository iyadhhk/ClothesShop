import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const register = createAsyncThunk(
  'auth/signup',
  async (data, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ ...data });
    try {
      const response = await axios.post('/auth/signup', body, config);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  console.log('login action', data);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ ...data });
  console.log('body', body);
  try {
    const response = await axios.post('/auth/login', body, config);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    status: 'idle',
    user: null,
    errors: null,
  },
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      return { ...state, isAuthenticated: false, user: null };
    },
    initErrors(state) {
      return { ...state, errors: null };
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        status: 'succeeded',
        isAuthenticated: true,
        user: action.payload,
        errors: null,
      };
    },
    [login.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      errors: action.payload,
    }),
    [register.pending]: (state, action) => {
      state.status = 'loading';
    },
    [register.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        status: 'succeeded',
        isAuthenticated: true,
        user: action.payload,
        errors: null,
      };
    },
    [register.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      errors: action.payload,
    }),
  },
});

export const { logout, initErrors } = authSlice.actions;
export default authSlice.reducer;
