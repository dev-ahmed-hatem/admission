import React, { useState } from "react";
import {
  Layout,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Divider,
  Checkbox,
} from "antd";
import FormSectionTitle from "@/components/admissions/FormSectionTitle";
import { extractBirthdateFromNationalId } from "@/utils";
import Preferences from "./Preferences";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const RegistrationFormPage: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedDivision, setSelectedDivision] = useState(null);

  const onFinish = (values: any) => {
    console.log("Form submitted:", values);
    // handle submission logic here
  };

  const onNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setFieldsValue({ nationalId: value });

    const birthDate = extractBirthdateFromNationalId(value);
    if (birthDate) {
      form.setFieldsValue({ birthday: birthDate });
    } else {
      form.setFieldsValue({ birthday: null });
    }
  };

  return (
    <Layout dir="rtl" className="min-h-screen bg-gray-50">
      {/* CONTENT */}
      <Content className="flex justify-center p-6">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg pb-8">
          {/* PAGE TITLE */}
          <Title
            level={2}
            className="text-center bg-calypso-950 text-white font-bold p-8 rounded-t"
          >
            نموذج تسجيل الالتحاق
          </Title>
          <div className="p-8">
            {/* CONDITIONS SECTION */}
            <section className="mb-8">
              <Title
                level={4}
                className="text-center text-orange-500 font-bold mb-4"
              >
                شروط الالتحاق
              </Title>
              <Paragraph className="text-gray-700 text-center">
                <Text>— هنا توضع شروط الالتحاق —</Text>
              </Paragraph>
            </section>

            {/* NOTES SECTION */}
            <section className="mb-8">
              <Title
                level={4}
                className="text-center text-orange-500 font-bold mb-4"
              >
                ملاحظات
              </Title>
              <Paragraph className="text-gray-700 text-center">
                <Text>— هنا توضع الملاحظات —</Text>
              </Paragraph>
            </section>

            {/* FORM SECTION */}
            <section className="my-8">
              <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                scrollToFirstError={true}
              >
                <FormSectionTitle title="البيانات الشخصية" />

                <Row gutter={[16, 16]}>
                  {/* Student Arabic Name */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="اسم الطالب باللغة العربية"
                      name="studentArabicName"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك ادخل اسم الطالب باللغة العربية",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل الاسم باللغة العربية"
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                  {/* Student English Name */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="اسم الطالب باللغة الانجليزية"
                      name="studentEnglishName"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك ادخل اسم الطالب باللغة الانجليزية",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل الاسم باللغة الانجليزية"
                        size="large"
                      />
                    </Form.Item>
                  </Col>

                  {/* Religion */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="الديانة"
                      name="religion"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر الديانة",
                        },
                      ]}
                    >
                      <Select placeholder="اختر الديانة" size="large">
                        <Option value="مسلم">مسلم</Option>
                        <Option value="مسيحي">مسيحي</Option>
                        <Option value="أخرى">أخرى</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Nationality */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="بلد الجنسية"
                      name="nationality"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر بلد الجنسية",
                        },
                      ]}
                    >
                      <Select
                        placeholder="اختر بلد الجنسية"
                        size="large"
                        showSearch
                      >
                        <Option value="مصر">مصر</Option>
                        <Option value="السعودية">السعودية</Option>
                        <Option value="الإمارات">الإمارات</Option>
                        {/* Add more as needed */}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Gender */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="النوع"
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر النوع",
                        },
                      ]}
                    >
                      <Select placeholder="اختر النوع" size="large">
                        <Option value="ذكر">ذكر</Option>
                        <Option value="أنثى">أنثى</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Governorate */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="المحافظة"
                      name="governorate"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر المحافظة",
                        },
                      ]}
                    >
                      <Select
                        placeholder="اختر المحافظة"
                        size="large"
                        showSearch
                      >
                        <Option value="القاهرة">القاهرة</Option>
                        <Option value="الإسكندرية">الإسكندرية</Option>
                        <Option value="الدقهلية">الدقهلية</Option>
                        {/* Add more as needed */}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* City */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="المدينة"
                      name="city"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك ادخل المدينة",
                        },
                      ]}
                    >
                      <Input placeholder="اسم المدينة" size="large" />
                    </Form.Item>
                  </Col>

                  {/* National ID */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="الرقم القومي"
                      name="nationalId"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك ادخل الرقم القومي",
                        },
                        {
                          pattern: /^[0-9]{14}$/,
                          message:
                            "الرقم القومي يجب أن يكون مكونًا من 14 رقمًا",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        onChange={onNationalIdChange}
                        allowClear
                        maxLength={14}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="تاريخ الميلاد"
                      name="birthday"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر تاريخ الميلاد",
                        },
                      ]}
                    >
                      <DatePicker
                        format="YYYY-MM-DD"
                        size="large"
                        className="w-full"
                        placeholder="تاريخ الميلاد"
                        disabled
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* CONTACT INFORMATION */}
                <FormSectionTitle title="بيانات الاتصال" />

                <Row gutter={[16, 16]}>
                  {/* Mobile Number */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="رقم الموبايل"
                      name="mobileNumber"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل رقم الموبايل",
                        },
                        {
                          pattern: /^01[0-9]{9}$/,
                          message:
                            "رقم الموبايل يجب أن يبدأ بـ 01 ويتكون من 11 رقمًا",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل رقم الموبايل"
                        size="large"
                        allowClear
                        maxLength={11}
                      />
                    </Form.Item>
                  </Col>

                  {/* Email */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="البريد الالكتروني للطالب"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل البريد الإلكتروني",
                        },
                        {
                          type: "email",
                          message: "من فضلك أدخل بريد إلكتروني صالح",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل البريد الإلكتروني للطالب"
                        size="large"
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  {/* Address */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="عنوان الطالب بالتفصيل"
                      name="address"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل عنوان الطالب بالتفصيل",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="أدخل عنوان الطالب بالتفصيل"
                        size="large"
                        rows={4}
                        allowClear
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* CERTIFICATE DATA */}
                <FormSectionTitle title="بيانات الشهادة" />

                <Row gutter={[16, 16]}>
                  {/* Certificate Type */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="الشهادة"
                      name="certificate"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر الشهادة",
                        },
                      ]}
                    >
                      <Select placeholder="اختر نوع الشهادة" size="large">
                        <Option value="الثانوية العامة">نوع 1</Option>
                        <Option value="نوع 2">نوع 2</Option>
                        <Option value="نوع 3">نوع 3</Option>
                        <Option value="نوع 4">نوع 4</Option>
                        {/* Add more as needed */}
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* School Name */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="اسم المعهد"
                      name="institute"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر اسم المعهد",
                        },
                      ]}
                    >
                      <Select placeholder="اختر اسم المعهد" size="large">
                        <Option value="معهد فني صحي">معهد فني صحي</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* القسم */}
                  {/* <Col xs={24} md={12}>
                    <Form.Item
                      label="القسم"
                      name="department"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل القسم",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل اسم القسم"
                        size="large"
                        allowClear
                      />
                    </Form.Item>
                  </Col> */}

                  {/* الشعبة */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="الشعبة"
                      name="division"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر الشعبة",
                        },
                      ]}
                    >
                      <Select
                        placeholder="اختر الشعبة"
                        size="large"
                        onChange={(value) => setSelectedDivision(value)}
                      >
                        <Option value="علوم الاشعة"> شعبة علوم الاشعة</Option>
                        <Option value="الاجهزة الطبية">
                          {" "}
                          شعبة الاجهزة الطبية
                        </Option>
                        <Option value="البصريات"> شعبة البصريات</Option>
                        <Option value="الرعاية التنفسية">
                          {" "}
                          شعبة الرعاية التنفسية
                        </Option>
                        <Option value="تركيبات اسنان">
                          {" "}
                          شعبة تركيبات اسنان
                        </Option>
                        <Option value="المختبرات"> شعبة المختبرات</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* Certificate Percentage (%) */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="النسبة المئوية للشهادة (%)"
                      name="certificatePercentage"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل النسبة المئوية",
                        },
                        {
                          pattern: /^\d+(\.\d{1,2})?$/,
                          message:
                            "من فضلك أدخل رقم صحيح أو عشري بحد أقصى رقمين عشريين",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل النسبة المئوية للشهادة"
                        size="large"
                        suffix="%"
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Certificate Degree */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="درجة الشهادة"
                      name="certificateDegree"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل درجة الشهادة",
                        },
                        {
                          pattern: /^\d+$/,
                          message: "درجة الشهادة يجب أن تكون رقم صحيح",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل درجة الشهادة"
                        size="large"
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* Year */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="السنة"
                      name="certificateYear"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر السنة",
                        },
                      ]}
                    >
                      <Select placeholder="اختر السنة" size="large">
                        {Array.from({ length: 9 }, (_, i) => {
                          const year = new Date().getFullYear() - 1 - i;
                          return (
                            <Option key={year} value={year}>
                              {year}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                {/* PREFERENCES SECTION */}
                <Preferences selectedDivision={selectedDivision} />

                {/* INSTRUCTIONS AND ACKNOWLEDGEMENT */}
                <FormSectionTitle title="تعليمات" />

                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <div className="bg-gray-100 p-4 rounded-lg border text-right">
                      <p className="text-gray-700">
                        {/* Replace this with real instructions */}
                        هنا يتم كتابة التعليمات الخاصة بالتسجيل وإرفاق المستندات
                        المطلوبة، يرجى قراءة جميع التعليمات بعناية قبل إرسال
                        الطلب.
                      </p>
                    </div>
                  </Col>
                </Row>

                <FormSectionTitle title="الإقرار" />

                <Row gutter={[16, 16]}>
                  <Col xs={24}>
                    <Form.Item
                      name="acknowledgement"
                      valuePropName="checked"
                      rules={[
                        {
                          validator: (_, value) =>
                            value
                              ? Promise.resolve()
                              : Promise.reject(
                                  new Error(
                                    "يجب الموافقة على الإقرار قبل إرسال الطلب"
                                  )
                                ),
                        },
                      ]}
                    >
                      <Checkbox>
                        <span className="font-medium text-gray-800">
                          أقر أنا مقدم الطلب بأن جميع البيانات المدخلة صحيحة،
                          وفي حال وجود أي خطأ أتحمل المسؤولية الكاملة.
                        </span>
                      </Checkbox>
                    </Form.Item>
                  </Col>
                </Row>

                {/* SUBMIT BUTTON  */}
                <Divider className="my-8" />

                <Row justify="center">
                  <Col xs={24} sm={12}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      className="!bg-calypso-700 hover:!bg-calypso border-none font-bold text-white mt-4"
                    >
                      إرسال الطلب
                    </Button>
                  </Col>
                </Row>
              </Form>
            </section>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default RegistrationFormPage;
