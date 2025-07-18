// app/components/core/form/CheckboxField.tsx
import React from "react";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

interface CheckboxFieldProps {
  name: string;
  label: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
}) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={name} name={name} />
    <Label htmlFor={name} className="text-sm font-normal">
      {label}
    </Label>
  </div>
);
