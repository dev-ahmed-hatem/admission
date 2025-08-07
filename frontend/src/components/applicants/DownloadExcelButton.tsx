import { ControlsType } from "@/pages/applicants/ApplicantsList";
import { useNotification } from "@/providers/NotificationProvider";
import { Button } from "antd";
import queryString from "query-string";
import { useState } from "react";

const DownloadExcelButton = ({
  search,
  controls,
}: {
  search: string;
  controls: ControlsType;
}) => {
  const notification = useNotification();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const api_base_url = import.meta.env.VITE_API_BASE_URL;
    const access = localStorage.getItem("access");
    if (!access || !api_base_url) {
      notification.error({
        message: "انتهاء مدة الصلاحية",
      });
    }
    try {
      setLoading(true);
      const response = await fetch(
        `${api_base_url}/applicants/export-applicants/?${queryString.stringify({
          search,
          sort_by: controls?.sort_by,
          order: controls?.order === "descend" ? "-" : "",
          ...controls?.filters,
        })}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();

      // Optional sanity check:
      // console.log("Blob type:", blob.type);
      // console.log("Blob size:", blob.size);

      // Create URL
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "المتقدمين.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      className="h-10 px-6 flex items-center text-white gap-2 rounded-lg
          bg-green-700 hover:bg-green-600 shadow-[0_2px_0_rgba(0,58,58,0.31)]"
      loading={loading}
      onClick={handleDownload}
    >
      تحميل بيانات المتقدمين
    </Button>
  );
};

export default DownloadExcelButton;
