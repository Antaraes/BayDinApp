"use client";
import { fetchAsyncNumberList, getAllNumbers } from "@/redux/bayDin/numberSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import api from "../../../api/bayDin";
import { FC, useEffect, useState } from "react";
import {
  fetchAsyncQuestionDetail,
  getAllQuestions,
  getQuestion,
} from "@/redux/bayDin/questionSlice";
import { useParams } from "next/navigation";
import Link from "next/link";

interface pageProps {}

const Page: FC<pageProps> = () => {
  const { questionId }: { questionId: string } = useParams();

  const [number, setNumber] = useState([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchQuery = async () => {
      try {
        const response = await api.get("/numberList");
        setNumber(response.data);
      } catch (error) {
        throw error;
      }
    };
    dispatch(fetchQuery);

    dispatch(fetchAsyncQuestionDetail(questionId));
  }, []);
  const question: question = useAppSelector(getQuestion);
  console.log(question);

  const englishNumbers = {
    "၁": "1",
    "၂": "2",
    "၃": "3",
    "၄": "4",
    "၅": "5",
    "၆": "6",
    "၇": "7",
    "၈": "8",
    "၉": "9",
    "၁၀": "10",
  };

  // console.log(numbers);

  return (
    <main className="mt-10 gap-2 flex flex-col justify-center items-center">
      <p>{question.questionName}</p>
      <div className="grid grid-cols-9 gap-2 w-[500px] ">
        {number.map((item, index) => (
          <Link
            href={`/questions/${questionId}/${englishNumbers[item]}`}
            key={index}
            className=" bg-blue-500 w-11 h-11 border border-red-300 flex justify-center items-center   text-white"
          >
            {item}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Page;
