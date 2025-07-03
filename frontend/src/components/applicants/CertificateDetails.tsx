import { Applicant } from "@/types/applicants";
import { Descriptions } from "antd";

const CertificateDetails = ({ applicant }: { applicant: Applicant }) => {
  return (
    <Descriptions bordered column={1} title="بيانات الشهادة">
      <Descriptions.Item label="المعهد">
        {applicant.institute}
      </Descriptions.Item>
      <Descriptions.Item label="الشعبة">{applicant.division}</Descriptions.Item>
      <Descriptions.Item label="المجموع">
        {applicant.total_mark}
      </Descriptions.Item>
      <Descriptions.Item label="إجمالي الدرجات">
        {applicant.total_out_of}
      </Descriptions.Item>
      <Descriptions.Item label="النسبة المئوية">
        {applicant.certificate_percentage}%
      </Descriptions.Item>
      <Descriptions.Item label="سنة الشهادة">
        {applicant.certificate_year}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CertificateDetails;
