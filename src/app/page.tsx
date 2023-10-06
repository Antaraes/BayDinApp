"use client";
import Image from "next/image";
import { useEffect } from "react";
import api from "../api/bayDin";
import { useAppDispatch } from "@/redux/hook";
import { fetchAsyncQuestions, fetchQuestions } from "@/redux/bayDin/questionSlice";
import QuestionListing from "@/components/QuestionListing";
import { fetchAsyncNumberList } from "@/redux/bayDin/numberSlice";
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAsyncQuestions());
    dispatch(fetchAsyncNumberList());
  }, []);
  return <QuestionListing searchParams={searchParams} />;
}
