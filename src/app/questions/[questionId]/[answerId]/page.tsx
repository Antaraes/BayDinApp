"use client";
import { fetchAsyncAnswer, getAnswer } from "@/redux/bayDin/questionSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
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

  return (
    <div className="flex flex-col justify-center items-center">
      <p className=" text-center mt-10">{answer.answerResult}</p>
      <Button className="w-20 mt-10">
        <Link href={`/questions/`}>Back</Link>
      </Button>
    </div>
  );
};

export default Page;
