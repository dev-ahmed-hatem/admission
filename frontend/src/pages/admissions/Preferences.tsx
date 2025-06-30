import { useEffect, useState } from "react";
import { Form, Button, Select, Row, Col, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FormSectionTitle from "@/components/admissions/FormSectionTitle";

const { Option } = Select;

// Put this somewhere at the top of your file
const availableDivisions = [
  "علوم الاشعة",
  "الاجهزة الطبية",
  "الرعاية التنفسية",
  "تركيبات اسنان",
  "المختبرات",
];

const Preferences = ({ selectedDivision }: { selectedDivision: any }) => {
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (selectedDivision) {
      const exists = availableDivisions.includes(selectedDivision);
      setShowPreferences(!exists);
    } else {
      setShowPreferences(false);
    }
  }, [selectedDivision]);

  if (!showPreferences) return null;
  return (
    <>
      <FormSectionTitle title="الرغبات" />

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form.List name="preferences">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space
                    key={index}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="start"
                  >
                    <Form.Item
                      label="الرغبة"
                      name={[field.name, "preference"]}
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر الرغبة",
                        },
                      ]}
                    >
                      <Select placeholder="اختر الرغبة" style={{ width: 250 }}>
                        <Option value="علوم الاشعة">علوم الاشعة</Option>
                        <Option value="الاجهزة الطبية">الاجهزة الطبية</Option>
                        <Option value="البصريات">البصريات</Option>
                        <Option value="الرعاية التنفسية">
                          الرعاية التنفسية
                        </Option>
                        <Option value="تركيبات اسنان">تركيبات اسنان</Option>
                        <Option value="المختبرات">المختبرات</Option>
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      className="text-red-600 mt-2"
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    إضافة رغبة جديدة
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Col>
      </Row>
    </>
  );
};

export default Preferences;
