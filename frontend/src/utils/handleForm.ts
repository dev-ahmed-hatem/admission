import { FormInstance } from "antd";

export const handleServerErrors = ({
  errorData,
  form,
}: {
  errorData: Record<string, string[]> | Record<string, Record<number, any>>;
  form: FormInstance;
}) => {
  let errorFields;
  if (Array.isArray(errorData)) {
    errorFields = Object.entries(errorData).map(([field, messages]) => ({
      name: field,
      errors: messages,
    }));
  } else {
    errorFields = Object.entries(errorData).map(([field, dict]) => ({
      name: field,
      errors: Object.values(dict),
    }));
  }

  form.setFields(errorFields);
};
