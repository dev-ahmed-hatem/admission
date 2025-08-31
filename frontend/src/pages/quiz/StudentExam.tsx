import { useState, useEffect, useCallback } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button } from "antd";
import questionsData from "@/data/questions.json";
import { useAppSelector } from "@/app/redux/hooks";
import { UserOutlined } from "@ant-design/icons";
import { useRecordMarkMutation } from "@/app/api/endpoints/applicants";
import { useNotification } from "@/providers/NotificationProvider";
import { axiosBaseQueryError } from "@/app/api/axiosBaseQuery";

const StudentExam = () => {
  const navigate = useNavigate();
  const notification = useNotification();
  const national_id = useAppSelector((state) => state.exam.national_id);
  const name = useAppSelector((state) => state.exam.name);

  if (!national_id) return <Navigate to={"/admissions"} />;

  const QUESTIONS_PER_PAGE = 1;
  const totalPages = Math.ceil(questionsData.length / QUESTIONS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [timeExpired, setTimeExpired] = useState(false);
  const [timeUpNotification, setTimeUpNotification] = useState(false);

  const [recordMark, { isLoading, isError, isSuccess, error: markError }] =
    useRecordMarkMutation();

  const submitResult = useCallback(() => {
    const correctCount = questionsData.filter(
      (q) => answers[q.id] && answers[q.id] === q.answer
    ).length;

    recordMark({ national_id, mark: correctCount });
  }, [answers, navigate, national_id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimeExpired(true);
          setTimeUpNotification(true);
          setTimeout(() => submitResult(), 2000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitResult]);

  const currentQuestions = questionsData.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  const handleOptionChange = (questionId: number, option: string) => {
    if (timeExpired) return;
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    const unanswered = currentQuestions.some((q) => !answers[q.id]);
    if (unanswered) {
      setError(
        "يجب الإجابة على جميع الأسئلة في هذه الصفحة للانتقال للصفحة التالية"
      );
      return;
    }
    setError("");

    if (currentPage === totalPages) {
      const allAnsweredGlobally = questionsData.every((q) => answers[q.id]);
      if (!allAnsweredGlobally) {
        setError("يجب الإجابة على جميع الأسئلة قبل إرسال الاختبار");
        return;
      }
      submitResult();
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setError("");
    setCurrentPage((prev) => prev - 1);
  };

  const handlePageClick = (page: number) => {
    const unanswered = currentQuestions.some((q) => !answers[q.id]);
    if (unanswered) {
      setError(
        "يجب الإجابة على جميع الأسئلة في هذه الصفحة قبل الانتقال لصفحة أخرى"
      );
      return;
    }
    setError("");
    setCurrentPage(page);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const allAnswered = currentQuestions.every((q) => answers[q.id]);

  if (!national_id) return <Navigate to={"/admissions"} />;

  useEffect(() => {
    if (isError) {
      const error = markError as axiosBaseQueryError;
      const message = error.data.detail ?? null;
      if (error.status === 409) {
        navigate("/admissions/result");
        notification.success({
          message:
            message || "حدث خطأ أثناء تسجيل إجاباتك، برجاء إعادة المحاولة",
        });
      } else {
        notification.error({
          message:
            message || "حدث خطأ أثناء تسجيل إجاباتك، برجاء إعادة المحاولة",
        });
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/admissions/result");
    }
  }, [isSuccess]);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#033849] flex justify-center p-4 font-sans"
    >
      <div className="bg-white rounded-xl w-full max-w-4xl p-8 shadow-xl relative">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl w-full max-w-4xl p-8 shadow-xl relative mb-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex gap-2 md:gap-6 flex-wrap justify-center">
              <img
                src="/logo.jpeg"
                alt="College Logo"
                className="w-28 h-28 object-contain rounded-full shadow-md border-4 border-white"
              />
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-extrabold text-[#033849] mt-4">
                  اختبار تحديد المستوى
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  أجب على جميع الأسئلة قبل انتهاء الوقت
                </p>
              </div>
            </div>
          </div>

          {/* Time Up Notification */}
          {timeUpNotification && (
            <div className="fixed bottom-4 right-4 bg-red-500 text-white text-center rounded-lg px-4 py-2 font-bold shadow-lg z-50 animate-bounce">
              انتهى الوقت! سيتم إرسال إجاباتك تلقائياً
            </div>
          )}

          {/* Timer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            {name && (
              <div className="w-full md:max-w-sm bg-white border rounded-xl shadow p-4 flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center">
                  <UserOutlined className="text-lg" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">اسم الطالب</p>
                  <h2 className="text-lg font-semibold">{name}</h2>
                </div>
              </div>
            )}

            <div className="w-full md:w-auto">
              <div className="bg-gradient-to-r from-[#033849] to-[#025272] text-white px-6 py-3 rounded shadow-md font-bold text-lg text-center">
                الوقت المتبقي: {formatTime(timeLeft)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-base">
          {currentQuestions.map((q, index) => (
            <div key={q.id} className="p-4 bg-gray-100 rounded-lg text-left">
              <p className="font-semibold mb-2" style={{ direction: "ltr" }}>
                {(currentPage - 1) * QUESTIONS_PER_PAGE + index + 1}.{" "}
                {q.question}
              </p>
              <div className="flex flex-col gap-2">
                {q.options.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 cursor-pointer ${
                      timeExpired ? "pointer-events-none opacity-50" : ""
                    }`}
                    style={{ direction: "ltr" }}
                  >
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleOptionChange(q.id, option)}
                      className="accent-[#033849]"
                      disabled={timeExpired}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-red-500 text-right mt-3">{error}</p>}

        {/* أزرار التالي والرجوع */}
        <div className="flex justify-between mt-6">
          {/*  زر الرجوع ع اليميييييييييين */}
          <Button
            onClick={handlePrev}
            type="primary"
            size="large"
            disabled={currentPage === 1 || timeExpired || isLoading}
          >
            رجوع
          </Button>

          {/* زر التالي و إرسال هما اللي ع الشمال */}
          <Button
            onClick={handleNext}
            type="primary"
            size="large"
            disabled={!allAnswered || timeExpired}
            loading={isLoading}
          >
            {currentPage === totalPages ? "إرسال" : "التالي"}
          </Button>
        </div>

        {/* Pagination أرقام الصفحات */}
        <div className="flex justify-start gap-2 mt-4 flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => {
            const start = i * QUESTIONS_PER_PAGE;
            const end = start + QUESTIONS_PER_PAGE;
            const pageQuestions = questionsData.slice(start, end);
            const allPageAnswered = pageQuestions.every((q) => answers[q.id]);

            return (
              <button
                key={i}
                onClick={() => handlePageClick(i + 1)}
                className={`px-3 py-1 rounded size-10 cursor-pointer ${
                  currentPage === i + 1
                    ? "bg-[#033849] text-white"
                    : allPageAnswered
                    ? "bg-green-300 text-black"
                    : "bg-gray-200 hover:bg-gray-300"
                } ${!allAnswered ? "cursor-not-allowed opacity-50" : ""}`}
                disabled={!allAnswered || timeExpired || isLoading}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StudentExam;
