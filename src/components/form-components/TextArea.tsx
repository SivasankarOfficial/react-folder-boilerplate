import React from "react";
import { useFormContext, FieldError } from "react-hook-form";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export default function TextArea({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  className = "",
  required = false,
  ...rest
}: Props) {
  const methods = useFormContext();

  const {
    register,
    formState: { errors },
  } = methods || {};

  const error = errors?.[id] as FieldError | undefined;

  const isControlled = typeof value !== "undefined" && typeof onChange === "function";

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? "border-red-500 bg-red-50" : "border-gray-300"} ${className}`}
        {...(isControlled ? { value, onChange } : register?.(id))}
        {...rest}
      />

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
}
