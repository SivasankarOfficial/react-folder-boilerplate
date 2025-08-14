// components/form-components/TextInput.tsx
import React from "react";
import { useForm, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: any;
  value?: string;
  className?: string;
}

export default function TextInput({ name, label, value, className, type, placeholder, required, onChange }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  const { onChange: rhfOnChange, ...rest } = register(name);

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-dark mb-1">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        onChange={(e) => {
          rhfOnChange(e);
          onChange?.(e.target.value);
        }}
        {...rest}
        value={value}
        className={`${className} block w-full rounded-md border px-4 py-2 shadow-sm text-dark placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          ${error ? "border-error bg-error/10" : "border-gray-300"}
        `}
      />
      {error && <p className="text-error text-sm mt-1">{(error as any)?.message}</p>}
    </div>
  );
}
