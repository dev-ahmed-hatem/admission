import ApplicantsStats from "@/components/applicants/ApplicantsStats";
import ApplicantsOverview from "@/components/applicants/ApplicantsOverview";

const Home = () => {
  return (
    <div className="font-bold text-xl padding-container pt-10">
      <ApplicantsOverview
        total={230}
        under_review={45}
        accepted={120}
        rejected={30}
      />
      <div className="my-16"></div>
      <div className="w-full">
        <ApplicantsStats />
      </div>
      <div className="my-16"></div>
    </div>
  );
};

export default Home;
