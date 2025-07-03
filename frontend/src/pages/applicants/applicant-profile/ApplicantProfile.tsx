import { useParams } from "react-router";
import Loading from "@/components/Loading";
import Error from "../../Error";
import { useGetApplicationQuery } from "@/app/api/endpoints/applicants";
import { axiosBaseQueryError } from "@/app/api/axiosBaseQuery";
import ApplicantProfileView from "./ApplicantProfileView";

const ApplicantProfile: React.FC = () => {
  const { national_id } = useParams();

  const {
    data: applicant,
    isFetching,
    isError,
    error: applicantError,
  } = useGetApplicationQuery(national_id as string);

  if (isFetching) return <Loading />;
  if (isError) {
    const error_title =
      (applicantError as axiosBaseQueryError).status === 404
        ? "متقدم غير موجود! تأكد من الرقم القومي للمتقدم المدخل."
        : undefined;

    return <Error subtitle={error_title} reload={error_title === undefined} />;
  }

  return <ApplicantProfileView applicant_data={applicant} />;
};

export default ApplicantProfile;
