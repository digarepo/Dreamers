import React from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  step?: string;
  className?: string;
}

export const renderFormField = ({
  label,
  name,
  type = "text",
  required = false,
  placeholder = "",
  step,
  className = "",
}: FormFieldProps) => {
  const baseClasses =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500";
  const finalClasses = `${baseClasses} ${className}`;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          className={finalClasses}
          rows={4}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={finalClasses}
          required={required}
          step={step}
        />
      )}
    </div>
  );
};

interface CheckboxFieldProps {
  name: string;
  label: string;
  className?: string;
}

export const renderCheckboxField = ({
  name,
  label,
  className = "",
}: CheckboxFieldProps) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        id={name}
        name={name}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={name} className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
};
