import React, { useEffect, useState } from "react";
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
import { useCreateRequestMutation } from "@/app/api/endpoints/applicants";
import { axiosBaseQueryError } from "@/app/api/axiosBaseQuery";
import { handleServerErrors } from "@/utils/handleForm";
import { useNotification } from "@/providers/NotificationProvider";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const RegistrationFormPage: React.FC = () => {
  const [form] = Form.useForm();
  const notification = useNotification();
  const navigate = useNavigate();

  const [
    createRequest,
    { data, isError, error: applicantError, isSuccess, isLoading },
  ] = useCreateRequestMutation();

  const onFinish = (values: any) => {
    const data = {
      ...values,
      birthdate: values.birthdate.format("YYYY-MM-DD"),
    };

    createRequest(data);
  };

  useEffect(() => {
    if (isError) {
      const error = applicantError as axiosBaseQueryError;
      if (error.status == 400) {
        handleServerErrors({
          errorData: error.data as Record<string, string[]>,
          form,
        });
      }

      notification.error({ message: "خطأ في بيانات التسجيل!" });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: `تم تسجيل الطلب`,
      });
      navigate(`/admissions/track-application/`, { state: data });
    }
  }, [isSuccess]);

  const onNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setFieldsValue({ national_id: value });

    const birthDate = extractBirthdateFromNationalId(value);
    if (birthDate) {
      form.setFieldsValue({ birthdate: birthDate });
    } else {
      form.setFieldsValue({ birthdate: null });
    }
  };

  const totalMark = Form.useWatch("total_mark", form);
  const totalOutOf = Form.useWatch("total_out_of", form);

  useEffect(() => {
    if (totalMark && totalOutOf && Number(totalOutOf) > 0) {
      const percentage = (Number(totalMark) / Number(totalOutOf)) * 100;
      form.setFieldsValue({
        certificate_percentage: percentage.toFixed(2),
      });
    } else {
      form.setFieldsValue({
        certificate_percentage: undefined,
      });
    }
  }, [totalMark, totalOutOf, form]);

  return (
    <Layout dir="rtl" className="min-h-screen bg-gray-50">
      {/* CONTENT */}
      <Content className="flex justify-center pg-4 lg:p-6">
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
                      name="arabic_name"
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
                      name="english_name"
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
                        <Option value="الجيزة">الجيزة</Option>
                        <Option value="الإسكندرية">الإسكندرية</Option>
                        <Option value="الدقهلية">الدقهلية</Option>
                        <Option value="البحر الأحمر">البحر الأحمر</Option>
                        <Option value="البحيرة">البحيرة</Option>
                        <Option value="الفيوم">الفيوم</Option>
                        <Option value="الغربية">الغربية</Option>
                        <Option value="الإسماعيلية">الإسماعيلية</Option>
                        <Option value="المنوفية">المنوفية</Option>
                        <Option value="المنيا">المنيا</Option>
                        <Option value="القليوبية">القليوبية</Option>
                        <Option value="الوادي الجديد">الوادي الجديد</Option>
                        <Option value="السويس">السويس</Option>
                        <Option value="اسوان">اسوان</Option>
                        <Option value="اسيوط">اسيوط</Option>
                        <Option value="بني سويف">بني سويف</Option>
                        <Option value="بورسعيد">بورسعيد</Option>
                        <Option value="دمياط">دمياط</Option>
                        <Option value="الشرقية">الشرقية</Option>
                        <Option value="جنوب سيناء">جنوب سيناء</Option>
                        <Option value="كفر الشيخ">كفر الشيخ</Option>
                        <Option value="مطروح">مطروح</Option>
                        <Option value="الأقصر">الأقصر</Option>
                        <Option value="قنا">قنا</Option>
                        <Option value="شمال سيناء">شمال سيناء</Option>
                        <Option value="سوهاج">سوهاج</Option>
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
                      name="national_id"
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
                        onInput={onNationalIdChange}
                        allowClear
                        maxLength={14}
                      />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      label="تاريخ الميلاد"
                      name="birthdate"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر تاريخ الميلاد",
                        },
                        {
                          validator: (_, value) => {
                            if (!value) {
                              return Promise.resolve();
                            }
                            if (dayjs(value).isBefore(dayjs("1995-10-01"))) {
                              return Promise.reject(
                                new Error("لا يسمح بإدخال تاريخ قبل 01-10-1995")
                              );
                            }
                            return Promise.resolve();
                          },
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
                      label="رقم الموبايل (واتساب)"
                      name="mobile"
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
                  {/* Institute */}
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

                  {/* Division */}
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
                      <Select placeholder="اختر الشعبة" size="large">
                        <Option value="علوم الأشعة والتصوير الطبي">
                          علوم الأشعة والتصوير الطبي
                        </Option>
                        <Option value="المختبرات الطبية">
                          المختبرات الطبية
                        </Option>
                        <Option value="الرعاية التنفسية">
                          الرعاية التنفسية
                        </Option>
                        <Option value="صناعة تركيبات الأسنان">
                          صناعة تركيبات الأسنان
                        </Option>
                        <Option value="الأجهزة الطبية الحيوية">
                          الأجهزة الطبية الحيوية
                        </Option>
                        <Option value="البصريات">البصريات</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  {/* المجموع (total_mark) */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="المجموع"
                      name="total_mark"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل المجموع",
                        },
                        {
                          pattern: /^\d+(\.\d{1,2})?$/,
                          message:
                            "يجب إدخال رقم صحيح أو عشري بحد أقصى رقمين عشريين",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل المجموع"
                        size="large"
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* من اجمالي الدرجات (total_out_of) */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="من اجمالي الدرجات"
                      name="total_out_of"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك أدخل اجمالي الدرجات",
                        },
                        {
                          pattern: /^\d+(\.\d{1,2})?$/,
                          message:
                            "يجب إدخال رقم صحيح أو عشري بحد أقصى رقمين عشريين",
                        },
                      ]}
                    >
                      <Input
                        placeholder="أدخل اجمالي الدرجات"
                        size="large"
                        allowClear
                      />
                    </Form.Item>
                  </Col>

                  {/* النسبة المئوية للشهادة (percentage) */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="النسبة المئوية للشهادة (%)"
                      name="certificate_percentage"
                    >
                      <Input
                        placeholder="تحسب تلقائياً"
                        size="large"
                        suffix="%"
                        disabled
                      />
                    </Form.Item>
                  </Col>

                  {/* السنة */}
                  <Col xs={24} md={12}>
                    <Form.Item
                      label="السنة"
                      name="certificate_year"
                      rules={[
                        {
                          required: true,
                          message: "من فضلك اختر السنة",
                        },
                      ]}
                    >
                      <Select placeholder="اختر السنة" size="large">
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() - i;
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

                {/* PREFERENCES SECTION
                <Preferences selectedDivision={selectedDivision} /> */}

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
                      loading={isLoading}
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
