"use client";
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
    <div className="flex gap-2">
      <button
        className="bg-blue-500 text-white p-1"
        onClick={() => router.push(`/?page=${Number(page) - 1}&per_page=${per_page}`)}
      >
        Prev Page
      </button>
      <div>
        {page} / {Math.ceil(10 / Number(per_page))}
      </div>
      <button
        className="bg-blue-500 text-white p-1"
        onClick={() => router.push(`/?page=${Number(page) + 1}&per_page=${per_page}`)}
      >
        Next Page
      </button>
    </div>
  );
};

export default PaginationControls;
