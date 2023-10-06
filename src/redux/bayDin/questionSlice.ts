import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import api from "../../api/bayDin";
const initialState = {
  questions: [],
  question: {} as question,
  answer: {} as answer,
  loading: false,
};
export const fetchAsyncQuestions = createAsyncThunk("questions/fetchAsyncQuestions", async () => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw error;
  }
});
export const fetchAsyncQuestionDetail = createAsyncThunk(
  "questions/fetchAsyncQuestionDetail",
  async (id: string) => {
    try {
      const response = await api.get(`/questions/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchAsyncAnswer = createAsyncThunk(
  "answer/fetchAsyncAnswer",
  async ({
    questionId,
    answerId,
  }: {
    questionId: string | string[];
    answerId: string | string[];
  }) => {
    try {
      const reponse = await api.get(`/questions/${questionId}/${answerId}`);
      return reponse.data;
    } catch (error) {
      throw error;
    }
  }
);
const questionSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    fetchQuestions: (state, { payload }) => {
      state.questions = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncQuestions.pending, (state) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(fetchAsyncQuestions.fulfilled, (state, actions) => {
        console.log("Fetch Success");
        return { ...state, questions: actions.payload, loading: false };
      })
      .addCase(fetchAsyncQuestions.rejected, (state) => {
        state.loading = false;
        console.log("Fetch Failed");
      })
      .addCase(fetchAsyncQuestionDetail.fulfilled, (state, actions) => {
        return { ...state, question: actions.payload, loading: false };
      })
      .addCase(fetchAsyncAnswer.fulfilled, (state, actions) => {
        return { ...state, answer: actions.payload };
      });
  },
});

export const { fetchQuestions } = questionSlice.actions;
export const getAllQuestions = (state: RootState) => state.questions.questions;
export const getQuestion = (state: RootState) => state.questions.question;
export const getAnswer = (state: RootState) => state.questions.answer;
export default questionSlice.reducer;
