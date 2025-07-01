import { Applicant } from "@/types/applicants";
import { Descriptions, Tag } from "antd";

const CertificateDetails = ({ applicant }: { applicant: Applicant }) => {
  return (
    <Descriptions bordered column={1} title="بيانات الشهادة">
      <Descriptions.Item label="الشهادة">
        {applicant.certificate}
      </Descriptions.Item>
      <Descriptions.Item label="المعهد">
        {applicant.institute}
      </Descriptions.Item>
      <Descriptions.Item label="القسم">{applicant.division}</Descriptions.Item>
      <Descriptions.Item label="النسبة المئوية">
        {applicant.certificate_percentage}%
      </Descriptions.Item>
      <Descriptions.Item label="التقدير">
        {applicant.certificate_degree}
      </Descriptions.Item>
      <Descriptions.Item label="سنة الشهادة">
        {applicant.certificate_year}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CertificateDetails;
