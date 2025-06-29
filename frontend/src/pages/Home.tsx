import ProjectsOverview from "@/components/projects/ProjectOverview";
import ApplicantsStats from "@/components/applicants/ApplicantsStats";

const Home = () => {
  return (
    <div className="font-bold text-xl padding-container pt-10">
      <ProjectsOverview
        {...{
          total: 100,
          ongoing: 120,
          completed: 50,
          pending_approval: 16,
          paused: 12,
          overdue: 11,
        }}
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
