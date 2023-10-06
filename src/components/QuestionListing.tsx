"use client";
import { FC } from "react";
import { useAppSelector } from "../redux/hook";
import { getAllQuestions } from "@/redux/bayDin/questionSlice";
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
const TABLE_HEAD = ["NO", "Questions"];

interface QuestionListingProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const QuestionListing: FC<QuestionListingProps> = ({ searchParams }) => {
  const router = useRouter();
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const questions: question[] = useAppSelector(getAllQuestions);
  const entries = questions.slice(start, end);
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
            <div className="flex w-full shrink-0 gap-2 md:w-max">
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  crossOrigin={undefined}
                />
              </div>
              <Button className="flex items-center gap-3" size="sm">
                Search
              </Button>
            </div>
          </div>
        </CardHeader>
        <table className="w-full min-w-max table-auto text-left">
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
            {entries.map(({ questionName, questionNo }, index) => {
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
            })}
          </tbody>
        </table>
      </Card>
      <PaginationControls />
    </>
  );
};

export default QuestionListing;
