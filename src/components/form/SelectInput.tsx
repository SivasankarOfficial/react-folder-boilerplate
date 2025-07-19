import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function SelectInput({ name, label, options }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Check if there's an error for this field
  const hasError = !!errors[name];

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>

      <select
        {...register(name)}
        className={`border rounded px-3 py-2 w-full transition 
          ${hasError ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"}
        `}
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {hasError && <p className="text-red-500 text-sm mt-1">{(errors[name] as any)?.message}</p>}
    </div>
  );
}
