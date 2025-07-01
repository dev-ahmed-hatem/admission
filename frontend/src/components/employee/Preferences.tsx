import { Card, Tag, Typography } from "antd";
import { Applicant } from "@/types/applicants";

interface Props {
  applicant: Applicant;
}

const Preferences = ({ applicant }: Props) => {
  return (
    <Card title="الرغبات">
      {applicant.preferences && applicant.preferences.length > 0 ? (
        applicant.preferences.map((pref: string) => (
          <Tag key={pref} color="geekblue" className="text-base px-3 py-1">
            {pref}
          </Tag>
        ))
      ) : (
        <Typography.Text type="danger">لا توجد رغبات</Typography.Text>
      )}
    </Card>
  );
};

export default Preferences;
