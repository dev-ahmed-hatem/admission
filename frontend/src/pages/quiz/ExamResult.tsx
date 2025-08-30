import { useAppSelector } from "@/app/redux/hooks";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Card, Layout } from "antd";
import { Navigate } from "react-router";

const { Content } = Layout;

const ExamResult = () => {
  const national_id = useAppSelector((state) => state.exam.national_id);

  if (!national_id) return <Navigate to={"/admissions"} />;
  return (
    <Content className="flex-grow flex justify-center items-center py-6 px-2 bg-calypso-950">
      <Card className="bg-white shadow-lg rounded-2xl p-8 max-w-lg text-center border border-blue-200">
        <div className="flex justify-center mb-4">
          <CheckCircleOutlined className="text-green-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          تم تسجيل إجاباتك بنجاح
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          نشكرك على استكمال الاختبار. سيتم مراجعة إجاباتك وإبلاغك بالنتيجة في
          أقرب وقت.
        </p>
        <div className="mt-6">
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-gradient-to-r from-[#033849] to-[#025272] text-white px-6 py-3 rounded-xl shadow hover:scale-105 transition-transform duration-300 font-semibold"
          >
            العودة إلى الصفحة الرئيسية
          </button>
        </div>
      </Card>
    </Content>
  );
};

export default ExamResult;
