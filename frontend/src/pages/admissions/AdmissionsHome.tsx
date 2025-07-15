import { useState } from "react";
import { Layout, Typography, Button, Card, List, Row, Col } from "antd";
import { EditOutlined, LoginOutlined } from "@ant-design/icons";
import FollowUpRequestForm from "@/components/admissions/FollowUpForm";
import { useNavigate } from "react-router";
import "@/styles/admissions.css";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;

export const admissionConditions = [
  "ألا يتجاوز سن المتقدم 30 سنة وفقًا للائحة.",
  "ألا يكون قد مرّ على التخرج من المعهد أكثر من 10 سنوات (دفعة 2016 كحد أقصى).",
  "الحصول على تقدير جيد جدًا على الأقل طبقًا لشهادة التخرج.",
  "تقديم ما يُفيد حسن السير والسلوك.",
  "تقديم أصل شهادة المعاملة العسكرية للذكور (تأدية أو إعفاء نهائي لمن وصل سن التجنيد).",
];

export const admissionsNotes = [
  "يسدد الطالب رسوم اختبارات القبول والمقابلة الشخصية.",
  "يعتبر الطالب مقبول بصفه نهائية بعد استيفاء الأوراق المطلوبة بعد اجتيازه المقابلة الشخصية.",
  "يتم استكمال الاوراق المطلوبة بعد اجتياز المقابلة الشخصية واختبارات القبول.",
  "أي خطأ بالبيانات مسؤوليه الطالب.",
];

const AdmissionsHome = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  return (
    <Content className="flex-grow flex justify-center items-center py-6 px-2 bg-calypso-950">
      <div className="overlay"></div>
      <Card className="w-full max-w-xl bg-white rounded-xl shadow-2xl py-8">
        <div className="text-center text-2xl font-bold mb-2 flex justify-center">
          <img src="logo.jpeg" />
        </div>
        <Title
          level={1}
          className="text-center text-calypso font-bold text-2xl mb-6"
        >
          بوابة التقديم
        </Title>

        {/* <Paragraph className="text-lg font-bold mb-4">
          شروط الالتحاق بالبرامج الخاصة:
        </Paragraph>

        <List
          dataSource={admissionConditions}
          renderItem={(item, index) => (
            <List.Item className="border-none p-0">
              <Text className="text-gray-700 text-base">
                {index + 1}. {item}
              </Text>
            </List.Item>
          )}
        /> */}

        {/* CONDITIONS SECTION */}
        <section className="mb-8">
          <Title
            level={4}
            className="text-center text-orange-500 font-bold mb-4"
          >
            شروط الالتحاق
          </Title>

          <div className="bg-gray-100 p-4 rounded-lg border text-right">
            <Paragraph className="text-gray-700">
              <List
                dataSource={admissionConditions}
                renderItem={(item, index) => (
                  <List.Item className="border-none p-0">
                    <Text className="text-gray-700 text-base">
                      {index + 1}. {item}
                    </Text>
                  </List.Item>
                )}
              />
            </Paragraph>
          </div>
        </section>

        {/* NOTES SECTION */}
        <section className="mb-8">
          <Title
            level={4}
            className="text-center text-orange-500 font-bold mb-4"
          >
            ملاحظات
          </Title>

          <div className="bg-gray-100 p-4 rounded-lg border text-right">
            <Paragraph className="text-gray-700">
              <List
                dataSource={admissionsNotes}
                renderItem={(item, index) => (
                  <List.Item className="border-none p-0">
                    <Text className="text-gray-700 text-base">
                      {index + 1}. {item}
                    </Text>
                  </List.Item>
                )}
              />
            </Paragraph>
          </div>
        </section>

        <Row gutter={[16, 16]} justify="center" className="mt-8">
          <Col xs={24} sm={12}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              block
              size="large"
              className="bg-calypso-700 hover:bg-calypso text-white font-bold py-3 rounded text-base flex items-center justify-center gap-2"
              onClick={() => navigate("apply/")}
            >
              تسجيل طلب التحاق جديد
            </Button>
          </Col>
          <Col xs={24} sm={12}>
            <Button
              type="default"
              icon={<LoginOutlined />}
              block
              size="large"
              onClick={() => setShowForm(true)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded text-base flex items-center justify-center gap-2"
            >
              متابعة طلب الالتحاق
            </Button>
          </Col>
        </Row>
        {showForm && (
          <Row gutter={[16, 16]} justify="center" className="mt-8">
            <FollowUpRequestForm />
          </Row>
        )}
      </Card>
    </Content>
  );
};

export default AdmissionsHome;
