import { Applicant } from "@/types/applicants";
import { Descriptions } from "antd";

const PersonalInfo = ({ applicant }: { applicant: Applicant }) => {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="الاسم (عربي)">
        {applicant.arabic_name}
      </Descriptions.Item>
      <Descriptions.Item label="الاسم (إنجليزي)">
        {applicant.english_name}
      </Descriptions.Item>
      <Descriptions.Item label="الديانة">
        {applicant.religion}
      </Descriptions.Item>
      <Descriptions.Item label="النوع">{applicant.gender}</Descriptions.Item>
      <Descriptions.Item label="الجنسية">
        {applicant.nationality}
      </Descriptions.Item>
      <Descriptions.Item label="محل الميلاد">
        {applicant.place_of_birth}
      </Descriptions.Item>
      <Descriptions.Item label="المحافظة">
        {applicant.governorate}
      </Descriptions.Item>
      <Descriptions.Item label="المدينة">{applicant.city}</Descriptions.Item>
      <Descriptions.Item label="الرقم القومي">
        {applicant.national_id}
      </Descriptions.Item>
      <Descriptions.Item label="تاريخ الميلاد">
        {applicant.birthdate}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PersonalInfo;
