import { Card, Avatar, Tabs, Button, Popconfirm } from "antd";
import {
  DeleteOutlined,
  UserOutlined,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import ContactInfo from "../../../components/applicants/ContactInfo";
import PersonalInfo from "../../../components/applicants/PersonalInfo";
import { Navigate, useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useNotification } from "@/providers/NotificationProvider";
import { Applicant } from "@/types/applicants";
import CertificateDetails from "../../../components/applicants/CertificateDetails";
import ApplicantStatus from "@/components/applicants/ApplicantStatus";
import { useEffect } from "react";
import {
  applicantsEndpoints,
  useDeleteApplicantMutation,
  useSetApplicantStatusMutation,
} from "@/app/api/endpoints/applicants";
import { useAppDispatch } from "@/app/redux/hooks";
import Enrollment from "@/components/applicants/Enrollment";
import Documents from "@/components/applicants/Documents";

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
    label: `الالتحاق`,
    key: "4",
    children: <Enrollment applicant={applicant} />,
  },
  {
    label: `الملفات`,
    key: "5",
    children: <Documents applicant={applicant} />,
  },
];

const ApplicantProfileView: React.FC<{
  applicant_data?: Applicant;
}> = ({ applicant_data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const applicant: Applicant = applicant_data || location.state;
  const notification = useNotification();
  const dispatch = useAppDispatch();
  const adminView = location.pathname.startsWith(
    "/admin/applicants/applicant-profile/"
  );

  const [
    deleteApplicant,
    { isError: deleteError, isLoading: deleting, isSuccess: deleted },
  ] = useDeleteApplicantMutation();

  const [setStatus, { data: newStatus, isLoading, isSuccess, isError }] =
    useSetApplicantStatusMutation();

  const handleDelete = () => {
    deleteApplicant(applicant.id);
  };

  useEffect(() => {
    if (deleteError) {
      notification.error({
        message: "حدث خطأ أثناء حذف الطلب ! برجاء إعادة المحاولة",
      });
    }
  }, [deleteError]);

  useEffect(() => {
    if (deleted) {
      notification.success({
        message: "تم حذف الطلب بنجاح",
      });

      navigate("/admin/applicants");
    }
  }, [deleted]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "حدث خطأ في تغيير الحالة ! برجاء إعادة المحاولة",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        applicantsEndpoints.util.updateQueryData(
          "getApplication",
          applicant.national_id,
          (draft: Applicant) => {
            draft.status = newStatus.status;
          }
        )
      );
      notification.success({
        message: "تم تغيير الحالة بنجاح",
      });
    }
  }, [isSuccess]);

  if (!applicant) return <Navigate to={"/admissions"} />;
  return (
    <>
      {/* Applicant Header */}
      <Card
        className={`shadow-lg rounded-xl ${
          applicant?.status === "مقبول" && "border-green-600 border-x-8"
        } ${applicant?.status === "مرفوض" && "border-red-500 border-x-8 "}`}
      >
        <div className="flex items-center justify-between flex-wrap gap-y-6">
          {/* Avatar with Fallback */}
          <div className="flex items-center flex-wrap gap-4">
            <Avatar
              className={`bg-calypso ${
                applicant?.status === "مقبول" && "bg-green-600"
              } ${
                applicant?.status === "مرفوض" && "bg-red-500"
              } text-white font-semibold size-14`}
              icon={<UserOutlined />}
            >
              {applicant!.arabic_name?.slice(0, 1)}
            </Avatar>

            <div>
              <h2 className="text-xl font-bold">{applicant!.arabic_name}</h2>
              <p className="text-gray-500">{applicant!.institute}</p>
            </div>
          </div>

          {/* Status */}
          <ApplicantStatus applicant={applicant} isAdminView={adminView} />
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
            {applicant.status === "قيد المراجعة" && (
              <>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => {
                    setStatus({
                      id: applicant.id,
                      status: "مقبول",
                    });
                  }}
                  className="bg-green-600 hover:bg-green-700 border-none"
                >
                  قبول
                </Button>

                <Button
                  danger
                  icon={<CloseOutlined />}
                  onClick={() => {
                    setStatus({
                      id: applicant.id,
                      status: "مرفوض",
                    });
                  }}
                >
                  رفض
                </Button>
              </>
            )}

            <Popconfirm
              title="هل أنت متأكد من حذف هذا الطلب؟"
              okText="نعم"
              cancelText="لا"
              onConfirm={handleDelete}
            >
              <Button
                className="enabled:bg-red-500 enabled:border-red-500 enabled:shadow-[0_2px_0_rgba(0,58,58,0.31)] 
      enabled:hover:border-red-400 enabled:hover:bg-red-400 enabled:text-white"
                icon={<DeleteOutlined />}
                loading={deleting}
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

export default ApplicantProfileView;
