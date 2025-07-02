import { Card, Avatar, Tabs, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  UserOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import ContactInfo from "../../../components/applicants/ContactInfo";
import PersonalInfo from "../../../components/applicants/PersonalInfo";
import { useLocation, useParams } from "react-router";
import Loading from "@/components/Loading";
import Error from "../../Error";
import { useNavigate } from "react-router";
import { useNotification } from "@/providers/NotificationProvider";
import { Applicant } from "@/types/applicants";
import CertificateDetails from "../../../components/applicants/CertificateDetails";
import Preferences from "../../../components/applicants/Preferences";
import ApplicantStatus from "@/components/applicants/ApplicantStatus";
import { useGetApplicationQuery } from "@/app/api/endpoints/applicants";
import { axiosBaseQueryError } from "@/app/api/axiosBaseQuery";

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

const ApplicantProfile: React.FC = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const { national_id } = useParams();
  const adminView = location.pathname.startsWith(
    "/admin/applicants/applicant-profile/"
  );

  const {
    data: applicant,
    isFetching,
    isError,
    error: employeeError,
  } = useGetApplicationQuery(national_id as string);
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

  if (isFetching) return <Loading />;
  if (isError) {
    const error_title =
      (employeeError as axiosBaseQueryError).status === 404
        ? "متقد غير موجود! تأكد من الرقم القومي للمتقدم المدخل."
        : undefined;

    return <Error subtitle={error_title} reload={error_title === undefined} />;
  }

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
              {applicant!.arabic_name?.slice(0, 1)}
            </Avatar>

            <div>
              <h2 className="text-xl font-bold">{applicant!.arabic_name}</h2>
              <p className="text-gray-500">{applicant!.certificate}</p>
            </div>
          </div>

          {/* Status */}
          <ApplicantStatus id={national_id!} isProjectOverdue={false} />
        </div>
      </Card>

      {/* Tabs Section */}
      <Tabs
        renderTabBar={(props, DefaultTabBar) => (
          <DefaultTabBar {...props} className="md:ps-2" />
        )}
        className="mt-4"
        direction="rtl"
        items={items(applicant!)}
      />

      <div className="flex justify-between mt-2 flex-wrap gap-2">
        {/* Meta Data */}
        <div className="flex gap-1 flex-col text-sm">
          <div>
            <span className="font-medium text-gray-700" dir="rtl">
              تاريخ التسجيل:{" "}
            </span>
            {applicant!.created_at}
          </div>
        </div>

        {/* Action Button */}
        {adminView && (
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
        )}
      </div>
    </>
  );
};

export default ApplicantProfile;
