export type Applicant = {
  id: string;
  arabic_name: string;
  english_name: string;
  religion: "مسلم" | "مسيحي" | "أخرى";
  nationality: string;
  gender: "ذكر" | "أنثى";
  governorate: string;
  city: string;
  national_id: string;
  birthdate: string;
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
  total_mark: number;
  total_out_of: number;
  certificate_year: number;
  status: "قيد المراجعة" | "مرفوض" | "مقبول";
  created_at?: string;
  updated_at?: string;
};
