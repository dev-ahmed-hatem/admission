import { Card, Tag, Typography } from "antd";
import { Applicant } from "@/types/applicants";

interface Props {
  applicant: Applicant;
}

const Preferences = ({ applicant }: Props) => {
  return (
    <Card title="رغبة الالتحاق">
      {applicant.preference ? (
        <Tag color="geekblue" className="text-base px-3 py-1">
          {applicant.preference}
        </Tag>
      ) : (
        <Typography.Text type="danger">لا توجد رغبة التحاق</Typography.Text>
      )}
    </Card>
  );
};

export default Preferences;
