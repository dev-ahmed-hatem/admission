import { Button, Descriptions, Modal, Tag } from "antd";
import { Applicant } from "@/types/applicants";
import { ReactElement, useState } from "react";

interface Props {
  applicant: Applicant;
}

const PersonalDetails = (applicant: Applicant) => (
  <div>
    <div className="mb-4">
      <div>الاسم:</div>
      <Tag className="text-base">{applicant.arabic_name}</Tag>
    </div>
    <div className="mb-4">
      <div>الرقم القومي:</div>
      <Tag className="text-base">{applicant.national_id}</Tag>
    </div>
    <div className="mb-4">
      <div>العنوان:</div>
      <Tag className="text-base">{applicant.address}</Tag>
    </div>
  </div>
);

const CertificateDetails = (applicant: Applicant) => (
  <div>
    <div className="mb-4">
      <div>نوع المعهد:</div>
      <Tag className="text-base">{applicant.institute}</Tag>
    </div>
    <div className="mb-4">
      <div>اسم المعهد:</div>
      <Tag className="text-base">{applicant.institute_name}</Tag>
    </div>
    <div className="mb-4">
      <div>الشعبة:</div>
      <Tag className="text-base">{applicant.division}</Tag>
    </div>
    <div className="mb-4">
      <div>المجموع:</div>
      <Tag className="text-base">{applicant.total_mark}</Tag>
    </div>
    <div className="mb-4">
      <div>إجمالي الدرجات:</div>
      <Tag className="text-base">{applicant.total_out_of}</Tag>
    </div>
  </div>
);

const Documents = ({ applicant }: Props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<string | null>(null);
  const [sideContent, setSideContent] = useState<{
    show: boolean;
    content: ReactElement | null;
  }>({ show: true, content: null });

  const handlePreview = (fileUrl: string) => {
    const ext = fileUrl?.split(".").pop()?.toLowerCase();

    if (ext && ["png", "jpg", "jpeg", "gif"].includes(ext)) {
      setPreviewType("image");
    } else if (ext === "pdf") {
      setPreviewType("pdf");
    } else {
      setPreviewType(null);
    }

    setPreviewSrc(fileUrl);
    setPreviewOpen(true);
  };

  const renderButton = (fileUrl: string, sideContent: ReactElement | null) => {
    return (
      <Button
        type="link"
        onClick={() => {
          setSideContent((prev) => ({ ...prev, content: sideContent }));
          handlePreview(fileUrl);
        }}
      >
        عرض الملف
      </Button>
    );
  };
  return (
    <>
      <Descriptions bordered column={1} title="الملفات">
        {/* بيان الدرجات */}
        <Descriptions.Item label="بيان الدرجات">
          {applicant.transcript_files?.length ? (
            applicant.transcript_files.map((fileUrl, idx) => (
              <div key={idx}>
                {renderButton(fileUrl, CertificateDetails(applicant))}
              </div>
            ))
          ) : (
            <span>لا يوجد ملفات</span>
          )}
        </Descriptions.Item>

        <Descriptions.Item label="الشهادة المؤقتة">
          {applicant.certificate_file
            ? renderButton(
                applicant.certificate_file,
                CertificateDetails(applicant)
              )
            : "لا يوجد"}
        </Descriptions.Item>

        <Descriptions.Item label="صورة بطاقة الرقم القومي">
          {applicant.national_id_photo
            ? renderButton(
                applicant.national_id_photo,
                PersonalDetails(applicant)
              )
            : "لا يوجد"}
        </Descriptions.Item>

        <Descriptions.Item label="شهادة المعاملة العسكرية للذكور">
          {applicant.military_certificate
            ? renderButton(applicant.military_certificate, null)
            : "لا يوجد"}
        </Descriptions.Item>

        <Descriptions.Item label="شهادة الامتياز">
          {applicant.internship_certificate
            ? renderButton(
                applicant.internship_certificate,
                CertificateDetails(applicant)
              )
            : "لا يوجد"}
        </Descriptions.Item>
      </Descriptions>

      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
        // width={"80%"}
        className="w-[90%] md:w-[80%]"
        style={{ top: 20 }}
        cancelButtonProps={{ color: "danger" }}
      >
        <Button
          type="primary"
          onClick={() =>
            setSideContent((prev) => ({ ...prev, show: !prev.show }))
          }
          className="mb-5"
        >
          {sideContent.show ? "إخفاء" : "عرض"} البيانات
        </Button>
        <div className="flex justify-between gap-3 flex-col md:flex-row">
          {sideContent.show && sideContent.content}
          {previewSrc && previewType === "image" && (
            <img alt="preview" style={{ width: "100%" }} src={previewSrc} />
          )}

          {previewType === "pdf" && previewSrc && (
            <iframe
              src={previewSrc}
              title="PDF Preview"
              width="100%"
              height="600px"
            />
          )}

          {!previewType && <p>لا يمكن عرض هذا النوع من الملفات.</p>}
        </div>
      </Modal>
    </>
  );
};

export default Documents;
