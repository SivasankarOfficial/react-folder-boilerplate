// components/form-components/RadioGroup.tsx
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  value: string;
  onChange?: () => void;
}

export default function SingleRadioButton({ name, label, value, onChange }: Props) {
  const { register } = useFormContext();

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="radio" value={value} {...register(name)} onChange={onChange} className="mr-2" />
      {label}
    </label>
  );
}
