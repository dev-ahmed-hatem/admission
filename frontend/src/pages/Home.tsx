import ApplicantsStats from "@/components/applicants/ApplicantsStats";
import ApplicantsOverview from "@/components/applicants/ApplicantsOverview";
import { useGetHomeStatsQuery } from "@/app/api/endpoints/applicants";
import Loading from "@/components/Loading";
import Error from "./Error";

const Home = () => {
  const { data, isLoading, isError } = useGetHomeStatsQuery();

  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="font-bold text-xl padding-container pt-10">
      <ApplicantsOverview
        total={data?.status_stats.find((st) => st.status === "الكل")!.count!}
        under_review={
          data?.status_stats.find((st) => st.status === "قيد المراجعة")!.count!
        }
        accepted={
          data?.status_stats.find((st) => st.status === "مقبول")!.count!
        }
        rejected={
          data?.status_stats.find((st) => st.status === "مرفوض")!.count!
        }
      />
      <div className="my-16"></div>
      <div className="w-full">
        <ApplicantsStats enrollment_stats={data?.enrollment!} />
      </div>
      <div className="my-16"></div>
    </div>
  );
};

export default Home;
