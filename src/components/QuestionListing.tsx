"use client";
import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchAsyncQuestions, getAllQuestions } from "@/redux/bayDin/questionSlice";
import { PencilIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import PaginationControls from "./PaginationControls";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";
import { fetchAsyncNumberList } from "@/redux/bayDin/numberSlice";
const TABLE_HEAD = ["NO", "Questions"];

interface QuestionListingProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const QuestionListing: FC<QuestionListingProps> = ({ searchParams }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAsyncQuestions());
    dispatch(fetchAsyncNumberList());
  }, []);
  const router = useRouter();
  const questions: question[] = useAppSelector(getAllQuestions);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterSearch, setFilterSearch] = useState(questions);
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);
  const itemsPerPage = 10; // Set the number of items per page
  const totalItems = 30; // Total number of items (replace with your actual data)

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filterBySearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value;
    let updateList = [...questions];
    updateList = updateList.filter((item) => {
      return item.questionName.indexOf(query) !== -1;
    });
    setFilterSearch(updateList);
  };

  const entries = filterSearch ? filterSearch.slice(start, end) : questions.slice(start, end);
  console.log(filterSearch);

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <Typography variant="h5" color="blue-gray">
                မင်းသိင်္ခ / လက်ထောက်ဗေဒင်
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                သိလိုသော မေးခွန်းအား ရှာဖွေပါ...
              </Typography>
            </div>

            <div className="flex w-full justify-center items-center shrink-0 gap-2 md:w-max">
              <PaginationControls />
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  crossOrigin={undefined}
                  onChange={(e) => filterBySearch(e)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <table className="w-full min-w-max h- table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b   border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map(({ questionName, questionNo }, index) => {
                const isLast = index === entries.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                return (
                  <tr
                    key={index}
                    className=" cursor-pointer "
                    onClick={() => router.push(`/questions/${questionNo}`)}
                  >
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal ">
                        {questionNo}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal hover:ring-deep-orange-600"
                      >
                        {questionName}
                      </Typography>
                    </td>
                  </tr>
                );
              })
            ) : (
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal hover:ring-deep-orange-600"
              >
                မေးခွန်းမရှိပါ
              </Typography>
            )}
          </tbody>
        </table>
      </Card>
    </>
  );
};

export default QuestionListing;
