// app/components/core/form/FormField.tsx
import React from "react";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  step?: string;
  placeholder?: string;
  rows?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  required = false,
  type = "text",
  step,
  placeholder,
  rows,
}) => (
  <div className="space-y-2">
    <Label htmlFor={name}>
      {label} {required && <span className="text-red-500">*</span>}
    </Label>

    {type === "textarea" ? (
      <Textarea
        id={name}
        name={name}
        rows={rows || 3}
        placeholder={placeholder}
        required={required}
      />
    ) : (
      <Input
        type={type}
        id={name}
        name={name}
        step={step}
        placeholder={placeholder}
        required={required}
      />
    )}
  </div>
);
