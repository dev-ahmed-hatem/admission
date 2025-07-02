import { useAppDispatch } from "@/app/redux/hooks";
import { useNotification } from "@/providers/NotificationProvider";
import { Project, statusColors } from "@/types/project";
import { Button, Tag } from "antd";
import { ReactElement, useEffect, useState } from "react";
import { TbStatusChange } from "react-icons/tb";
import Loading from "../Loading";
import { IoPauseOutline } from "react-icons/io5";
import { RxResume } from "react-icons/rx";

type Transition = {
  label: string;
  nextStatus: string;
  icon?: ReactElement;
};

const getButtonText = (status: string): Transition => {
  switch (status) {
    case "قيد المراجعة":
      return {
        label: "بدء التنفيذ",
        nextStatus: "ongoing",
        icon: <TbStatusChange />,
      };
    case "مقبول":
      return { label: "إيقاف", nextStatus: "paused", icon: <IoPauseOutline /> };
    case "مرفوض":
      return { label: "استئناف", nextStatus: "ongoing", icon: <RxResume /> };
    default:
      return { label: "", nextStatus: "" };
  }
};

const ApplicantStatus = ({
  id,
  isProjectOverdue,
}: {
  id: Project["id"];
  isProjectOverdue: boolean;
}) => {
  const notification = useNotification();
  const dispatch = useAppDispatch();

  // const handleStatusChange = () => {
  //   changeState({ id, status: transition?.nextStatus! });
  // };

  return (
    <>
      <Button
        type="primary"
        icon={<TbStatusChange />}
        // onClick={handleStatusChange}
        // loading={switchingState}
      >
        قيد المراجعة
      </Button>
    </>
  );
};

export default ApplicantStatus;
