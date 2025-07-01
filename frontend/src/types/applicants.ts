export type Applicant = {
  arabic_name: string;
  english_name: string;
  religion: "مسلم" | "مسيحي" | "أخرى";
  nationality: string;
  gender: "ذكر" | "أنثى";
  governorate: string;
  city: string;
  national_id: string;
  birthdate: string; // ISO format
  mobile: string;
  email: string;
  address?: string;
  certificate: "معهد فني صحي";
  institute: "معهد فني صحي";
  division?:
    | "علوم الاشعة"
    | "الاجهزة الطبية"
    | "البصريات"
    | "الرعاية التنفسية"
    | "تركيبات اسنان"
    | "المختبرات";
  certificate_percentage?: number;
  certificate_degree?: string;
  certificate_year: number;
  preferences?: string[];
  status?: "قيد المراجعة" | "مرفوض" | "مقبول";
  created_at?: string;
  updated_at?: string;
};
