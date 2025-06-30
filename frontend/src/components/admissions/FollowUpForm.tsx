import React from "react";
import { Form, Input, Button, Typography, Row, Col } from "antd";

const { Title } = Typography;

const FollowUpRequestForm: React.FC = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    console.log("Form submitted:", values);
  };

  return (
    <div dir="rtl" className="w-full max-w-md mx-auto p-6">
      <Title level={3} className="text-center text-calypso font-bold mb-6">
        متابعة طلب الالتحاق
      </Title>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="ادخل الرقم القومي"
          name="nationalId"
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
          <Input size="large" />
        </Form.Item>

        <Row justify="center">
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="bg-calypso-700 hover:bg-calypso border-none font-bold text-white mt-4"
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
