import ApplicantsStats from "@/components/applicants/ApplicantsStats";
import ApplicantsOverview from "@/components/applicants/ApplicantsOverview";
import { useGetHomeStatsQuery } from "@/app/api/endpoints/applicants";
import Loading from "@/components/Loading";
import Error from "./Error";
import { useEffect, useState } from "react";
import { ENROLLMENT } from "@/types/applicants";

const Home = () => {
  const { data, isLoading, isError, isSuccess } = useGetHomeStatsQuery();
  const [statusMap, setStautsMap] = useState<Record<string, number> | null>(
    null
  );
  const [enrollmentMap, setEnrollmentMap] = useState<Record<
    string,
    number
  > | null>(null);

  useEffect(() => {
    setStautsMap(
      Object.fromEntries(
        (data?.status_stats || []).map((st) => [st.status, st.count])
      )
    );
    setEnrollmentMap(
      Object.fromEntries(
        (data?.enrollment || []).map((en) => [en.enrollment, en.count])
      )
    );
  }, [isSuccess]);

  if (isLoading || statusMap === null || enrollmentMap === null)
    return <Loading />;
  if (isError) return <Error />;
  return (
    <div className="font-bold text-xl padding-container pt-10">
      <ApplicantsOverview
        total={statusMap["الكل"] || 0}
        under_review={statusMap["قيد المراجعة"] || 0}
        accepted={statusMap["مقبول"] || 0}
        rejected={statusMap["مرفوض"] || 0}
      />
      <div className="my-16"></div>
      <h1 className="text-center mb-10 text-calypso-900 font-bold text-xl md:text-3xl">
        إحصائيات الطلاب في البرامج
      </h1>
      <div className="w-full md:h-lvh">
        <ApplicantsStats
          enrollment_stats={ENROLLMENT.map((en) => ({
            enrollment: en,
            count: enrollmentMap[en] || 0,
          }))}
        />
      </div>
      <div className="my-16"></div>
    </div>
  );
};

export default Home;
