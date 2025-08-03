import { FC } from "react";
import { Result } from "antd";

const SubmissionClosedMessage: FC = () => {
  return (
    <div className="flex justify-center items-center min-h-lvh px-4">
      <Result
        status="warning"
        title="انتهاء فترة التقديم"
        subTitle="نعتذر، لقد انتهت فترة التقديم ولن يتم قبول أي طلبات جديدة حالياً."
        className="text-right"
      />
    </div>
  );
};

export default SubmissionClosedMessage;
