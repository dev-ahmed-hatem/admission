export const INSTITUTES = [
  "معهد فني صحي حكومي",
  "معهد فني صحي أزهر",
  "معهد بصريات",
];

export const ALL_DIVISIONS = [
  "المختبرات الطبية",
  "علوم الأشعة والتصوير الطبي",
  "الأجهزة الطبية الحيوية",
  "صناعة تركيبات الأسنان",
  "الرعاية التنفسية / رعاية حرجة وطوارئ / تخدير ورعاية مركزية",
  "البصريات",
  "عظام",
  "معاون صحي / مراقب صحي",
  "تغذية علاجية",
  "صناعات دوائية",
  "تسجيل طبي وإحصاء",
  "إرشاد وتثقيف صحي",
];

export const PRIMARY_DIVISIONS = [
  "علوم الأشعة والتصوير الطبي",
  "المختبرات الطبية",
  "الرعاية التنفسية / رعاية حرجة وطوارئ / تخدير ورعاية مركزية",
  "صناعة تركيبات الأسنان",
  "الأجهزة الطبية الحيوية",
  "البصريات",
];

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
  institute: "معهد فني صحي";
  division: (typeof ALL_DIVISIONS)[number];
  certificate_percentage?: number;
  total_mark: number;
  total_out_of: number;
  certificate_year: number;
  status: "قيد المراجعة" | "مرفوض" | "مقبول";
  preference:
    | "الالتحاق بالمرحلة الأولى"
    | "تركيبات الأسنان"
    | "تكنولوجيا البصريات";
  created_at?: string;
  updated_at?: string;
};
