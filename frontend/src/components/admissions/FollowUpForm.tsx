import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useLazyGetStudentExamQuery } from "@/app/api/endpoints/applicants";
import { axiosBaseQueryError } from "@/app/api/axiosBaseQuery";
import { useNotification } from "@/providers/NotificationProvider";
import { useNavigate } from "react-router";
import { useAppDispatch } from "@/app/redux/hooks";
import { setExam } from "@/app/slices/examSlice";

interface FormFields {
  national_id: string;
}

const FollowUpRequestForm: React.FC = () => {
  const [form] = Form.useForm<FormFields>();
  const notification = useNotification();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [
    getExam,
    { data, isError, error: applicantError, isSuccess, isLoading },
  ] = useLazyGetStudentExamQuery();

  const handleFinish = (values: { national_id: string }) => {
    getExam(values.national_id);
  };

  useEffect(() => {
    if (isError) {
      const error = applicantError as axiosBaseQueryError;
      if (error.status === 403) {
        dispatch(setExam({ national_id: form.getFieldValue("national_id") }));
        navigate("result");
      } else {
        const message = error.data.detail;
        notification.error({
          message: message ?? "حدث خطأ! برجاء المحاولة لاحقا",
        });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setExam(data));
      navigate("get-ready");
    }
  }, [isSuccess]);

  return (
    <div dir="rtl" className="w-full max-w-md mx-auto p-6">
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="ادخل الرقم القومي"
          name="national_id"
          rules={[
            {
              required: true,
              message: "من فضلك ادخل الرقم القومي",
            },
            {
              pattern: /^[0-9]{14}$/,
              message: "الرقم القومي يجب أن يكون مكوناً من 14 رقمًا",
            },
          ]}
        >
          <Input size="large" maxLength={14} />
        </Form.Item>

        <Row justify="center">
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="bg-calypso-700 hover:bg-calypso border-none font-bold text-white mt-4"
              loading={isLoading}
            >
              متابعة
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FollowUpRequestForm;
