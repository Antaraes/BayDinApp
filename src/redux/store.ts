import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./bayDin/questionSlice";
import numberSlice from "./bayDin/numberSlice";

export const store = configureStore({
  reducer: { questions: questionSlice, numberList: numberSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
