import { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Tabs,
  Button,
  Switch,
  Image,
  Space,
  Popconfirm,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import ContactInfo from "../../components/employee/ContactInfo";
import PersonalInfo from "../../components/employee/PersonalInfo";
import {
  employeesEndpoints,
  useDeleteEmployeeMutation,
  useGetEmployeeQuery,
  useSwitchEmployeeActiveMutation,
} from "@/app/api/endpoints/employees";
import { useParams } from "react-router";
import Loading from "@/components/Loading";
import Error from "../Error";
import { useNavigate } from "react-router";
import { axiosBaseQueryError } from "@/app/api/axiosBaseQuery";
import { useAppDispatch } from "@/app/redux/hooks";
import { useNotification } from "@/providers/NotificationProvider";
import { Applicant } from "@/types/applicants";
import CertificateDetails from "../../components/employee/CertificateDetails";
import Preferences from "../../components/employee/Preferences";
import ApplicantStatus from "@/components/applicants/ApplicantStatus";

// Sample Applicant Data
export const applicant: Applicant = {
  arabic_name: "محمد أحمد عبد الرحمن",
  english_name: "Mohamed Ahmed Abdelrahman",
  religion: "مسلم",
  nationality: "مصر",
  gender: "ذكر",
  governorate: "القاهرة",
  city: "مدينة نصر",
  national_id: "29805010123456",
  birthdate: "1998-05-01",
  mobile: "+201012345678",
  email: "mohamed.ahmed@example.com",
  address: "شارع النصر، مدينة نصر، القاهرة",
  certificate: "الثانوية العامة",
  institute: "معهد فني صحي",
  division: "علوم الاشعة",
  certificate_percentage: 92.75,
  certificate_degree: "امتياز",
  certificate_year: 2022,
  preferences: ["علوم الأشعة", "الأجهزة الطبية", "البصريات"],
  created_at: " 2025-05-15 15:08:27",
  status: "قيد المراجعة",
};

const items = (applicant: Applicant) => [
  {
    label: `البيانات الشخصية`,
    key: "1",
    children: <PersonalInfo applicant={applicant} />,
  },
  {
    label: `بيانات الاتصال`,
    key: "2",
    children: <ContactInfo applicant={applicant} />,
  },
  {
    label: `تفاصيل الشهادة`,
    key: "3",
    children: <CertificateDetails applicant={applicant} />,
  },
  {
    label: `الرغبات`,
    key: "4",
    children: <Preferences applicant={applicant} />,
  },
];

const ApplicantProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const { applicant_id } = useParams();
  // const {
  //   data: employee,
  //   isFetching,
  //   isError,
  //   error: employeeError,
  // } = useGetEmployeeQuery({ id: applicant_id as string, format: "detailed" });
  // const [
  //   switchActive,
  //   { data: switchRes, isLoading: switching, isError: switchError },
  // ] = useSwitchEmployeeActiveMutation();
  // const [
  //   deleteEmployee,
  //   { isError: deleteError, isLoading: deleting, isSuccess: deleted },
  // ] = useDeleteEmployeeMutation();

  // const dispatch = useAppDispatch();

  // const [imageError, setImageError] = useState(false);
  // const [isActive, setIsActive] = useState<boolean | null>(null);

  // const toggleStatus = () => {
  //   switchActive(applicant_id as string);
  // };

  // const handleDelete = () => {
  //   deleteEmployee(applicant_id as string);
  // };

  // useEffect(() => {
  //   if (employee) setIsActive(employee.is_active);
  // }, [employee]);

  // useEffect(() => {
  //   if (switchError) {
  //     notification.error({
  //       message: "حدث خطأ في تغيير الحالة ! برجاء إعادة المحاولة",
  //     });
  //   }
  // }, [switchError]);

  // useEffect(() => {
  //   if (switchRes) {
  //     if (employee) setIsActive(switchRes.is_active);
  //     dispatch(
  //       employeesEndpoints.util.updateQueryData(
  //         "getEmployee",
  //         { id: applicant_id as string, format: "detailed" },
  //         (draft: Employee) => {
  //           draft.is_active = switchRes.is_active;
  //         }
  //       )
  //     );
  //     notification.success({
  //       message: "تم تغيير الحالة بنجاح",
  //     });
  //   }
  // }, [switchRes]);

  // useEffect(() => {
  //   if (deleteError) {
  //     notification.error({
  //       message: "حدث خطأ أثناء حذف الموظف ! برجاء إعادة المحاولة",
  //     });
  //   }
  // }, [deleteError]);

  // useEffect(() => {
  //   if (deleted) {
  //     notification.success({
  //       message: "تم حذف الموظف بنجاح",
  //     });

  //     navigate("/employees");
  //   }
  // }, [deleted]);

  // if (isFetching) return <Loading />;
  // if (isError) {
  //   const error_title =
  //     (employeeError as axiosBaseQueryError).status === 404
  //       ? "موظف غير موجود! تأكد من كود الموظف المدخل."
  //       : undefined;

  //   return <Error subtitle={error_title} reload={error_title === undefined} />;
  // }
  return (
    <>
      {/* Employee Header */}
      <Card className="shadow-lg rounded-xl">
        <div className="flex items-center justify-between flex-wrap gap-y-6">
          {/* Avatar with Fallback */}
          <div className="flex items-center flex-wrap gap-4">
            <Avatar
              className="bg-calypso text-white font-semibold size-14"
              icon={<UserOutlined />}
            >
              {applicant.arabic_name?.slice(0, 1)}
            </Avatar>

            <div>
              <h2 className="text-xl font-bold">{applicant.arabic_name}</h2>
              <p className="text-gray-500">{applicant.certificate}</p>
            </div>
          </div>

          {/* Status */}
          <ApplicantStatus id={applicant_id!} isProjectOverdue={false} />
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs
        renderTabBar={(props, DefaultTabBar) => (
          <DefaultTabBar {...props} className="md:ps-2" />
        )}
        className="mt-4"
        direction="rtl"
        items={items(applicant)}
      />

      <div className="flex justify-between mt-2 flex-wrap gap-2">
        {/* Meta Data */}
        <div className="flex gap-1 flex-col text-sm">
          <div>
            <span className="font-medium text-gray-700" dir="rtl">
              تاريخ التسجيل:{" "}
            </span>
            {applicant.created_at}
          </div>
        </div>

        {/* Action Button */}
        <div className="btn-wrapper flex md:justify-end mt-4 flex-wrap gap-4">
          <Button
            type="primary"
            icon={<CheckOutlined />}
            onClick={() => {
              // Handle accept logic
              console.log("Applicant accepted!");
            }}
            className="bg-green-600 hover:bg-green-700 border-none"
          >
            قبول
          </Button>

          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => {
              // Handle reject logic
              console.log("Applicant rejected!");
            }}
          >
            رفض
          </Button>

          <Popconfirm
            title="هل أنت متأكد من حذف هذا الطلب؟"
            okText="نعم"
            cancelText="لا"
            onConfirm={() => {
              // Handle delete logic
              console.log("Applicant deleted!");
            }}
          >
            <Button
              className="enabled:bg-red-500 enabled:border-red-500 enabled:shadow-[0_2px_0_rgba(0,58,58,0.31)] 
      enabled:hover:border-red-400 enabled:hover:bg-red-400 enabled:text-white"
              icon={<DeleteOutlined />}
            >
              حذف الطلب
            </Button>
          </Popconfirm>
        </div>
      </div>
    </>
  );
};

export default ApplicantProfilePage;
