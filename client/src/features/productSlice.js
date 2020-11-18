import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (formData, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    formData.forEach((value, key) => {
      console.log('key,value', key, value);
    });

    try {
      const response = await axios.post('/store/product', formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    status: 'idle',
    products: null,
    product: null,
    error: null,
  },
  reducers: {},
  extraReducers: {
    [addProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [addProduct.fulfilled]: (state, action) => ({
      ...state,
      status: 'succeeded',
      products: null,
      product: action.payload,
      error: null,
    }),
    [addProduct.rejected]: (state, action) => ({
      ...state,
      status: 'failed',
      error: action.payload,
    }),
  },
});
export default productSlice.reducer;
