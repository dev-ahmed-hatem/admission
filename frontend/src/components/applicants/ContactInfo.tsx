import { Descriptions } from "antd";
import { Applicant } from "@/types/applicants";

const ContactInfo = ({ applicant }: { applicant: Applicant }) => {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="رقم الموبايل">
        {applicant.mobile}
      </Descriptions.Item>
      <Descriptions.Item label="رقم الموبايل 2">
        {applicant.mobile2 || "غير مسجل"}
      </Descriptions.Item>
      <Descriptions.Item label="البريد الإلكتروني">
        {applicant.email}
      </Descriptions.Item>
      <Descriptions.Item label="العنوان">{applicant.address}</Descriptions.Item>
    </Descriptions>
  );
};

export default ContactInfo;
