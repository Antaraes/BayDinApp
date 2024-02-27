import QuestionListing from "@/components/QuestionListing";
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return <QuestionListing searchParams={searchParams} />;
}
