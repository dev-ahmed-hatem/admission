import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";
import { useLazyGetApplicationQuery } from "@/app/api/endpoints/applicants";
import { axiosBaseQueryError } from "@/app/api/axiosBaseQuery";
import { useNotification } from "@/providers/NotificationProvider";
import { useNavigate } from "react-router";

const { Title } = Typography;

interface FormFields {
  national_id: string;
}

const FollowUpRequestForm: React.FC = () => {
  const [form] = Form.useForm<FormFields>();
  const notification = useNotification();
  const navigate = useNavigate();

  const [
    getApplication,
    { data: applicant, isError, error: applicantError, isSuccess, isLoading },
  ] = useLazyGetApplicationQuery();

  const handleFinish = (values: { national_id: string }) => {
    getApplication(values.national_id);
  };

  useEffect(() => {
    if (isError) {
      const error = applicantError as axiosBaseQueryError;
      if (error.status == 404) {
        form.setFields([
          { name: "national_id", errors: ["رقم قومي غير مسجل"] },
        ]);
      } else {
        notification.error({ message: "حدث خطأ! برجاء المحاولة لاحقا" });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate("track-application/", { state: applicant });
    }
  }, [isSuccess]);

  return (
    <div dir="rtl" className="w-full max-w-md mx-auto p-6">
      <Title level={3} className="text-center text-calypso font-bold mb-6">
        متابعة طلب الالتحاق
      </Title>

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
