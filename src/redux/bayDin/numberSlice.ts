import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../api/bayDin";

const initialState = {
  numbers: [],
};
export const fetchAsyncNumberList = createAsyncThunk("numbers/fetchAsyncNumberList", async () => {
  try {
    const response = await api.get("/numberList");
    return response.data;
  } catch (error) {
    throw error;
  }
});
const numberSlice = createSlice({
  name: "numberList",
  initialState,
  reducers: {
    fetchNumbers: (state, { payload }) => {
      state.numbers = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncNumberList.pending, () => {
        console.log("Number Pending");
      })
      .addCase(fetchAsyncNumberList.fulfilled, (state, action) => {
        console.log("Fetch Success");
        return { ...state, numbers: action.payload };
      })
      .addCase(fetchAsyncNumberList.rejected, () => {
        console.log("Fetch Failed");
      });
  },
});

export const { fetchNumbers } = numberSlice.actions;
export const getAllNumbers = (state: RootState) => state.numberList.numbers;

export default numberSlice.reducer;
