import { useEffect, useState } from "react";
import { Table, Input, Avatar, Space, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router";
import { tablePaginationConfig } from "../../utils/antd";
import Loading from "@/components/Loading";
import Error from "../Error";
import { ColumnsType } from "antd/es/table";
import { useNotification } from "@/providers/NotificationProvider";
import { Applicant } from "@/types/applicants";

const columns: ColumnsType = [
  {
    title: "اسم الطالب",
    dataIndex: "arabic_name",
    key: "arabic_name",
    render: (text: string, record) => (
      <Space>
        <Avatar
          className="bg-calypso text-white font-semibold"
          icon={<UserOutlined />}
        >
          {text?.slice(0, 1)}
        </Avatar>
        <span className="flex flex-col">
          <span className="text-base">{text}</span>
          <span className="text-xs text-gray-400">
            رقم قومي: {record.national_id}
          </span>
        </span>
      </Space>
    ),
    sorter: (a, b) => a.arabic_name.localeCompare(b.arabic_name),
  },

  {
    title: "النوع",
    dataIndex: "gender",
    key: "gender",
    render: (gender: string) => (
      <Tag color={gender === "ذكر" ? "blue" : "pink"}>{gender}</Tag>
    ),
    filters: [
      { text: "ذكر", value: "ذكر" },
      { text: "أنثى", value: "أنثى" },
    ],
    onFilter: (value, record) => record.gender === value,
  },

  {
    title: "الجنسية",
    dataIndex: "nationality",
    key: "nationality",
  },

  {
    title: "نسبة الشهادة",
    dataIndex: "certificate_percentage",
    key: "certificate_percentage",
    render: (value: number) => <span>{value}%</span>,
    sorter: (a, b) =>
      a.certificate_percentage && b.certificate_percentage
        ? a.certificate_percentage - b.certificate_percentage
        : 0,
  },

  {
    title: "الرغبات",
    dataIndex: "preferences",
    key: "preferences",
    render: (preferences?: string[]) => (
      <Space wrap>
        {preferences?.map((pref, index) => (
          <Tag key={index} color="geekblue">
            {pref}
          </Tag>
        ))}
      </Space>
    ),
  },
];
export const mockApplicants: Applicant[] = [
  {
    arabic_name: "محمد أحمد علي",
    english_name: "Mohamed Ahmed Ali",
    religion: "مسلم",
    nationality: "مصر",
    gender: "ذكر",
    governorate: "القاهرة",
    city: "مدينة نصر",
    national_id: "29805010123456",
    birthdate: "1998-05-01",
    mobile: "+201012345678",
    email: "mohamed.ali@example.com",
    address: "شارع التحرير - القاهرة",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "البصريات",
    certificate_percentage: 92.5,
    certificate_degree: "جيد جدا",
    certificate_year: 2022,
    preferences: ["علوم الأشعة", "الأجهزة الطبية"],
  },
  {
    arabic_name: "منى سامي حسن",
    english_name: "Mona Sami Hassan",
    religion: "مسيحي",
    nationality: "السعودية",
    gender: "أنثى",
    governorate: "الإسكندرية",
    city: "سموحة",
    national_id: "29906021234567",
    birthdate: "1999-06-02",
    mobile: "+966501234567",
    email: "mona.hassan@example.com",
    address: "حي الروضة - جدة",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "المختبرات",
    certificate_percentage: 88,
    certificate_degree: "جيد",
    certificate_year: 2023,
    preferences: ["المختبرات"],
  },
  {
    arabic_name: "أحمد ياسر عبد الله",
    english_name: "Ahmed Yasser Abdullah",
    religion: "مسلم",
    nationality: "الإمارات",
    gender: "ذكر",
    governorate: "الدقهلية",
    city: "المنصورة",
    national_id: "30007030123456",
    birthdate: "2000-07-03",
    mobile: "+971501234567",
    email: "ahmed.abdullah@example.com",
    address: "شارع الجامعة - المنصورة",
    certificate: "الدبلوم",
    institute: "معهد فني صحي",
    division: "المختبرات",
    certificate_percentage: 85.3,
    certificate_degree: "جيد",
    certificate_year: 2021,
    preferences: ["الأجهزة الطبية"],
  },
  {
    arabic_name: "سارة محمود حسن",
    english_name: "Sara Mahmoud Hassan",
    religion: "مسلم",
    nationality: "مصر",
    gender: "أنثى",
    governorate: "الجيزة",
    city: "الدقي",
    national_id: "29708041234567",
    birthdate: "1997-08-04",
    mobile: "+201112345678",
    email: "sara.hassan@example.com",
    address: "شارع التحرير - الجيزة",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "تركيبات اسنان",
    certificate_percentage: 90.0,
    certificate_degree: "امتياز",
    certificate_year: 2020,
    preferences: ["تركيبات اسنان", "البصريات"],
  },
  {
    arabic_name: "علي محمد فؤاد",
    english_name: "Ali Mohamed Fouad",
    religion: "مسلم",
    nationality: "السعودية",
    gender: "ذكر",
    governorate: "القاهرة",
    city: "المعادي",
    national_id: "29609151234567",
    birthdate: "1996-09-15",
    mobile: "+966530123456",
    email: "ali.fouad@example.com",
    address: "شارع النصر - المعادي",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "الرعاية التنفسية",
    certificate_percentage: 78.9,
    certificate_degree: "جيد",
    certificate_year: 2022,
    preferences: ["الرعاية التنفسية"],
  },
  {
    arabic_name: "هالة أحمد سعيد",
    english_name: "Hala Ahmed Said",
    religion: "مسلم",
    nationality: "مصر",
    gender: "أنثى",
    governorate: "الإسكندرية",
    city: "العصافرة",
    national_id: "29812061234567",
    birthdate: "1998-12-06",
    mobile: "+201223456789",
    email: "hala.said@example.com",
    address: "شارع جمال عبد الناصر - الإسكندرية",
    certificate: "معادلة",
    institute: "معهد فني صحي",
    division: "المختبرات",
    certificate_percentage: 82.7,
    certificate_degree: "جيد جدا",
    certificate_year: 2021,
    preferences: ["المختبرات", "علوم الأشعة"],
  },
  {
    arabic_name: "كريم أشرف إبراهيم",
    english_name: "Karim Ashraf Ibrahim",
    religion: "مسلم",
    nationality: "مصر",
    gender: "ذكر",
    governorate: "القاهرة",
    city: "حلوان",
    national_id: "29910171234567",
    birthdate: "1999-10-17",
    mobile: "+201334567890",
    email: "karim.ibrahim@example.com",
    address: "شارع منصور - حلوان",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "علوم الاشعة",
    certificate_percentage: 95.4,
    certificate_degree: "امتياز",
    certificate_year: 2023,
    preferences: ["علوم الأشعة"],
  },
  {
    arabic_name: "إيمان خالد عبد الله",
    english_name: "Eman Khaled Abdullah",
    religion: "مسيحي",
    nationality: "الإمارات",
    gender: "أنثى",
    governorate: "القاهرة",
    city: "مدينة نصر",
    national_id: "30003051234567",
    birthdate: "2000-03-05",
    mobile: "+971502345678",
    email: "eman.abdullah@example.com",
    address: "شارع مكرم عبيد - مدينة نصر",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "البصريات",
    certificate_percentage: 89.1,
    certificate_degree: "جيد جدا",
    certificate_year: 2022,
    preferences: ["البصريات"],
  },
  {
    arabic_name: "شيماء سامي يوسف",
    english_name: "Shaimaa Sami Youssef",
    religion: "مسلم",
    nationality: "مصر",
    gender: "أنثى",
    governorate: "الشرقية",
    city: "الزقازيق",
    national_id: "29711221234567",
    birthdate: "1997-11-22",
    mobile: "+201445678901",
    email: "shaimaa.youssef@example.com",
    address: "شارع الجيش - الزقازيق",
    certificate: "الدبلوم",
    institute: "معهد فني صحي",
    division: "الرعاية التنفسية",
    certificate_percentage: 83.5,
    certificate_degree: "جيد جدا",
    certificate_year: 2020,
    preferences: ["الرعاية التنفسية", "الأجهزة الطبية"],
  },
  {
    arabic_name: "مصطفى عبد الرحمن مصطفى",
    english_name: "Mostafa Abdelrahman Mostafa",
    religion: "مسلم",
    nationality: "السعودية",
    gender: "ذكر",
    governorate: "الإسكندرية",
    city: "العجمي",
    national_id: "29805181234567",
    birthdate: "1998-05-18",
    mobile: "+966540123456",
    email: "mostafa.mostafa@example.com",
    address: "شارع البيطاش - الإسكندرية",
    certificate: "الثانوية العامة",
    institute: "معهد فني صحي",
    division: "الاجهزة الطبية",
    certificate_percentage: 79.9,
    certificate_degree: "جيد",
    certificate_year: 2021,
    preferences: ["الأجهزة الطبية"],
  },
  // Generate the rest (10 more) automatically:
  ...Array.from({ length: 10 }).map((_, i) => {
    const idNum = `30101${i.toString().padStart(6, "0")}`;
    return {
      arabic_name: `طالب رقم ${i + 11}`,
      english_name: `Student ${i + 11}`,
      religion: i % 2 === 0 ? "مسلم" : "مسيحي",
      nationality: i % 3 === 0 ? "مصر" : "الإمارات",
      gender: i % 2 === 0 ? "ذكر" : "أنثى",
      governorate: i % 2 === 0 ? "القاهرة" : "الإسكندرية",
      city: i % 2 === 0 ? "مدينة نصر" : "سموحة",
      national_id: idNum,
      birthdate: `200${i % 10}-0${(i % 9) + 1}-15`,
      mobile: "+201500000000",
      email: `student${i + 11}@example.com`,
      address: "عنوان عشوائي",
      certificate: "الثانوية العامة",
      institute: "معهد فني صحي",
      division: [
        "علوم الأشعة",
        "الأجهزة الطبية",
        "البصريات",
        "الرعاية التنفسية",
        "تركيبات اسنان",
        "المختبرات",
      ][i % 6],
      certificate_percentage: 70 + i,
      certificate_degree: ["جيد", "جيد جدا", "امتياز"][i % 3],
      certificate_year: 2020 + (i % 4),
      preferences: [
        [
          "علوم الأشعة",
          "الأجهزة الطبية",
          "البصريات",
          "الرعاية التنفسية",
          "تركيبات اسنان",
          "المختبرات",
        ][i % 6],
      ],
    } as Applicant;
  }),
];

const EmployeesList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const notification = useNotification();
  const navigate = useNavigate();

  // Search Function
  const onSearch = (value: string) => {
    setSearch(value);
  };

  // const [
  //   deleteEmployees,
  //   { isError: deleteError, isLoading: deleting, isSuccess: deleted },
  // ] = useDeleteEmployeesMutation();

  // // handling employees
  // const { data, isFetching, isError, refetch } = useGetEmployeesQuery({
  //   page,
  //   search,
  // });

  // useEffect(() => {
  //   refetch();
  // }, [search, page]);

  // useEffect(() => {
  //   if (deleted) {
  //     notification.success({
  //       message: "تم حذف الموظفين",
  //     });
  //   }
  //   setSelectedList([]);
  // }, [deleted]);

  // useEffect(() => {
  //   if (deleteError) {
  //     notification.error({
  //       message: "حدث خطأ أثناء حذف الموظفين ! برجاء إعادة المحاولة",
  //     });
  //   }
  // }, [deleteError]);

  // if (isFetching) return <Loading />;
  // if (isError) return <Error />;
  return (
    <>
      <h1 className="mb-6 text-2xl md:text-3xl font-bold">المتقدمين</h1>

      <div className="flex justify-between flex-wrap mb-4">
        <Input.Search
          placeholder="ابحث عن طالب..."
          onSearch={onSearch}
          className="mb-4 w-full max-w-md h-10"
          defaultValue={search}
          allowClear={true}
          onClear={() => setSearch("")}
        />
      </div>

      {/* Table */}
      <Table
        dataSource={mockApplicants}
        columns={columns}
        onRow={(record) => ({
          onClick: () => navigate(`applicant-profile/${record.id}`),
        })}
        rowKey="national_id"
        pagination={tablePaginationConfig()}
        bordered
        scroll={{ x: "max-content" }}
        className="clickable-table  calypso-header"
      />
    </>
  );
};

export default EmployeesList;
