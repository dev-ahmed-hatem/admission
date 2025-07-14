import { useAppDispatch } from "@/app/redux/hooks";
import { useNotification } from "@/providers/NotificationProvider";
import { Switch, Tag } from "antd";
import { useEffect } from "react";
import { Applicant } from "@/types/applicants";
import {
  applicantsEndpoints,
  useSetApplicantStatusMutation,
} from "@/app/api/endpoints/applicants";

const ApplicantStatus = ({
  applicant,
  isAdminView = false,
}: {
  applicant: Applicant;
  isAdminView: boolean;
}) => {
  const notification = useNotification();
  const dispatch = useAppDispatch();

  const [setStatus, { data: newStatus, isLoading, isSuccess, isError }] =
    useSetApplicantStatusMutation();

  const toggleStatus = () => {
    setStatus({
      id: applicant.id,
      status: applicant.status === "مقبول" ? "مرفوض" : "مقبول",
    });
  };

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

  return applicant.status === "قيد المراجعة" ? (
    <Tag color="geekblue" className="text-base">
      {applicant.status}
    </Tag>
  ) : isAdminView ? (
    <Switch
      checked={applicant.status === "مقبول"!}
      onChange={toggleStatus}
      checkedChildren="مقبول"
      unCheckedChildren="مرفوض"
      loading={isLoading}
    />
  ) : (
    // <Tag color={applicant.status === "مقبول" ? "green" : "red"}>
    //   {applicant.status}
    // </Tag>

    <Tag color="geekblue" className="text-base">
      قيد المراجعة
    </Tag>
  );
};

export default ApplicantStatus;
