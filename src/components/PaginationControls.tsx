"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { IconButton, Typography } from "@material-tailwind/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface PaginationControlsProps {}

const PaginationControls: FC<PaginationControlsProps> = ({}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "10";
  return (
    <div className="flex items-center w-full justify-center gap-8 ">
      <IconButton
        size="sm"
        variant="outlined"
        disabled={page === "1"}
        onClick={() => router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography>
        Page <strong className="text-gray-900">{page}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={() => router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)}
        disabled={parseInt(page) >= parseInt(per_page)}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default PaginationControls;
