import { Button, Card, Layout } from "antd";
import { useAppSelector } from "@/app/redux/hooks";
import { Navigate, useNavigate } from "react-router";

const { Content } = Layout;

const ExamRules = () => {
  const navigate = useNavigate();
  const national_id = useAppSelector((state) => state.exam.national_id);

  const handleStart = () => {
    navigate("/admissions/exam");
  };

  if (!national_id) return <Navigate to={"/admissions"} />;

  return (
    <Content className="flex-grow flex justify-center items-center py-6 px-2 bg-calypso-950">
      <div className="overlay"></div>
      <Card className="w-full max-w-xl bg-white rounded-xl shadow-2xl py-8">
        <h1 className="text-3xl font-bold text-center text-[#033849] mb-4">
          تعليمات الامتحان
        </h1>
        <ul className="list-disc list-inside text-gray-700 leading-loose mb-6 text-right text-base space-y-1">
          <li>مدة الاختبار (15 دقيقة) فقط.</li>
          <li>
            الاختبار متاح يوم الأحد الموافق 31 من الساعة 6:00 حتى الساعة 7:00
            مساء.
          </li>
          <li>يُسمح بمحاولة واحدة فقط لكل طالب.</li>
          <li>لن يتم إعادة فتح الاختبار بعد الموعد المحدد.</li>
          <li>يسدد الطالب رسوم اختبارات القبول والمقابلة الشخصية.</li>
          <li>
            يعتبر الطالب مقبولًا بصفة نهائية بعد استيفاء الأوراق المطلوبة.
          </li>
          <li>يتم استكمال الأوراق المطلوبة بعد اجتياز اختبار القبول.</li>
          <li>أي خطأ في البيانات يقع تحت مسؤولية الطالب.</li>
          <li>تأكد من جودة واستقرار اتصالك بالإنترنت قبل بدء الاختبار.</li>
          <li>اقرأ جميع الأسئلة بعناية قبل اختيار الإجابة.</li>
          <li>راجع إجاباتك جيدًا قبل إرسال الاختبار.</li>
        </ul>

        <div className="flex justify-center">
          <Button
            type="primary"
            size="large"
            className="bg-[#033849] hover:bg-[#025272]"
            onClick={handleStart}
          >
            ابدأ الامتحان
          </Button>
        </div>
      </Card>
    </Content>
  );
};

export default ExamRules;
