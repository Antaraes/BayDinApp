"use client";
import { store } from "./store";
import { Provider } from "react-redux";
import { FC } from "react";

interface providerProps {
  children: React.ReactNode;
}

const ReduxProvider: FC<providerProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
