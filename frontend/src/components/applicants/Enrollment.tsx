import { Descriptions } from "antd";
import { Applicant } from "@/types/applicants";

interface Props {
  applicant: Applicant;
}

const Enrollment = ({ applicant }: Props) => {
  return (
    <Descriptions bordered column={1} title="الالتحاق">
      <Descriptions.Item label="الشعبة الحالية">
        {applicant.division}
      </Descriptions.Item>
      <Descriptions.Item label="منقول إلى">
        {applicant.enrollment}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default Enrollment;
