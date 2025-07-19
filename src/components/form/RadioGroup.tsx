import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function RadioGroup({ name, label, options }: Props) {
  const { register } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      {options.map((opt) => (
        <label key={opt.value} className="inline-flex items-center mr-4">
          <input type="radio" value={opt.value} {...register(name)} className="mr-2" />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
