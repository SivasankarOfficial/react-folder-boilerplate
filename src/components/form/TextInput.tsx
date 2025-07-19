import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

export default function TextInput({ name, label, type = "text", placeholder, required = false, onChange }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const { onChange: rhfOnChange, ...rest } = register(name);

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          rhfOnChange(e);
          onChange?.(e.target.value);
        }}
        {...rest}
        className={`border px-3 py-2 w-full rounded transition-all 
          ${error ? "border-red-500 bg-red-50" : "border-gray-300"}
        `}
      />
      {error && <p className="text-red-500 text-sm mt-1">{(error as any)?.message}</p>}
    </div>
  );
}
