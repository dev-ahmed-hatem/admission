import { useEffect, useState } from "react";
import { Form, Select} from "antd";
import FormSectionTitle from "@/components/admissions/FormSectionTitle";
import { PRIMARY_DIVISIONS } from "@/types/applicants";

const { Option, OptGroup } = Select;

const Preference = ({ selectedDivision }: { selectedDivision: any }) => {
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    if (selectedDivision) {
      const exists = PRIMARY_DIVISIONS.includes(selectedDivision);
      setShowPreferences(!exists);
    } else {
      setShowPreferences(false);
    }
  }, [selectedDivision]);

  if (!showPreferences) return null;
  return (
    <>
      <FormSectionTitle title="رغبة الالتحاق" />

      <Form.Item
        label="الرغبة"
        name="preference"
        rules={[
          {
            required: true,
            message: "من فضلك اختر الرغبة",
          },
        ]}
      >
        <Select placeholder="اختر الرغبة" size="large" style={{ width: 300 }}>
          <OptGroup label="الالتحاق بالمرحلة الأولى">
            <Option value="الالتحاق بالمرحلة الأولى">
              الالتحاق بالمرحلة الأولى
            </Option>
          </OptGroup>
          <OptGroup label="الالتحاق بالمرحلة الثانية">
            <Option value="تركيبات الأسنان">تركيبات الأسنان</Option>
            <Option value="تكنولوجيا البصريات">تكنولوجيا البصريات</Option>
          </OptGroup>
        </Select>
      </Form.Item>
    </>
  );
};

export default Preference;
