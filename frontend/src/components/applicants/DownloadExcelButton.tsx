import { useLazyExportApplicantsExcelQuery } from "@/app/api/endpoints/applicants";
import { Button } from "antd";
import { useEffect } from "react";

const DownloadExcelButton = () => {
  const [download, { data, isLoading, isSuccess }] =
    useLazyExportApplicantsExcelQuery();

  const handleDownload = async () => {
    if (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "المتقدمين.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handleDownload();
    }
  }, [isSuccess]);

  return (
    <Button
      type="primary"
      className="h-10 px-6 flex items-center text-white gap-2 rounded-lg
          bg-green-700 hover:bg-green-600 shadow-[0_2px_0_rgba(0,58,58,0.31)]"
      loading={isLoading}
      onClick={() => download()}
    >
      تحميل بيانات المتقدمين
    </Button>
  );
};

export default DownloadExcelButton;
