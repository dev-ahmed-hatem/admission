import { Button, Col, Form, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useNotification } from "@/providers/NotificationProvider";

const DocumentUploads = ({
  isOptics,
  setFiles,
}: {
  isOptics: () => boolean;
  setFiles: Function;
}) => {
  const notification = useNotification();

  const validateFileType = (file: File) => {
    const isAllowed =
      file.type === "application/pdf" || file.type.startsWith("image/");
    if (!isAllowed) {
      notification.error({ message: "يسمح فقط برفع ملفات PDF أو صور" });
    }
    if (file.size > 2097152) {
      notification.error({ message: "لا يسمح بحجم ملف أكبر من 2MB" });
      return false
    }
    return isAllowed;
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const uploadProps: (prop: string) => UploadProps = (prop: string) => ({
    beforeUpload: (file) => {
      if (validateFileType(file)) {
        setFiles((prev: any) => ({ ...prev, [prop]: file }));
        return false;
      } else {
        return Upload.LIST_IGNORE;
      }
    },
    maxCount: 1,
  });

  const uploadPropsMulti: (prop: string) => UploadProps = (prop: string) => ({
    beforeUpload: (file, fileList) => {
      if (!validateFileType(file)) return Upload.LIST_IGNORE;
      return false;
    },
    maxCount: 2,
    onChange: (info) => {
      const fileList = info.fileList.filter(
        (file) => file.originFileObj && validateFileType(file.originFileObj)
      );

      setFiles((prev: any) => ({
        ...prev,
        [prop]: fileList.map((file) => file.originFileObj),
      }));
    },
  });

  return (
    <>
      <Col xs={24} md={12}>
        <Form.Item
          label="صورة واضحة من بيان درجات فرقة أولى وثانية"
          name="transcripts"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "من فضلك قم برفع بيان الدرجات",
            },
          ]}
        >
          <Upload {...uploadPropsMulti("transcripts")} multiple listType="text">
            <Button icon={<UploadOutlined />}>اضغط لرفع الملفات</Button>
          </Upload>
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label="صورة واضحة من الشهادة المؤقتة (بها الدرجة)"
          name="certificate_file"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "من فضلك قم برفع الشهادة المؤقتة",
            },
          ]}
        >
          <Upload {...uploadProps("certificate_file")} listType="text">
            <Button icon={<UploadOutlined />}>اضغط لرفع الملفات</Button>
          </Upload>
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label="صورة بطاقة الرقم القومي واضحة"
          name="national_id_photo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "من فضلك قم برفع بطاقة الرقم القومي",
            },
          ]}
        >
          <Upload {...uploadProps("national_id_photo")} listType="text">
            <Button icon={<UploadOutlined />}>اضغط لرفع الملفات</Button>
          </Upload>
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label="شهادة المعاملة العسكرية للذكور"
          name="military_certificate"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            ({ getFieldValue }) => ({
              validator: (rule, value) => {
                if (
                  getFieldValue("gender") === "ذكر" &&
                  (!value || value.length === 0)
                ) {
                  return Promise.reject(
                    "من فضلك قم برفع شهادة المعاملة العسكرية"
                  );
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Upload {...uploadProps("military_certificate")} listType="text">
            <Button icon={<UploadOutlined />}>اضغط لرفع الملفات</Button>
          </Upload>
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item
          label="شهادة الامتياز"
          name="internship_certificate"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!isOptics() && (!value || value.length === 0)) {
                  return Promise.reject("من فضلك قم برفع شهادة الامتياز");
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Upload {...uploadProps("internship_certificate")} listType="text">
            <Button icon={<UploadOutlined />}>اضغط لرفع الملفات</Button>
          </Upload>
        </Form.Item>
      </Col>
    </>
  );
};

export default DocumentUploads;
