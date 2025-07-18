export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "date" | "select" | "checkbox" | "number";
  required?: boolean;
  options?: { value: string; label: string }[];
  colSpan?: number;
  validation?: any;
};
