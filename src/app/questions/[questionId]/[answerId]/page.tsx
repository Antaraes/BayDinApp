"use client";
import { fetchAsyncAnswer, getAnswer } from "@/redux/bayDin/questionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useParams } from "next/navigation";
import { FC, useEffect } from "react";
interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { questionId, answerId } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAsyncAnswer({ questionId, answerId }));
  });
  const answer: answer = useAppSelector(getAnswer);

  return <p className=" text-center mt-10">{answer.answerResult}</p>;
};

export default Page;
