import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export default function CheckboxGroup({ name, label, options }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>

      {options.map((opt, index) => (
        <label key={opt.value} className="flex items-center space-x-2 mb-1">
          <input
            type="checkbox"
            value={opt.value}
            {...register(name, {
              validate: (value: any) => {
                if (Array.isArray(value) && value.length === 0) {
                  return "Please select at least one option";
                }
                return true;
              },
            })}
            className={`h-4 w-4 ${error ? "text-red-500 border-red-500 focus:ring-red-500" : "text-blue-600"}`}
          />
          <span>{opt.label}</span>
        </label>
      ))}

      {error && <p className="text-red-500 text-sm mt-1">{(error as any)?.message || "This field is required"}</p>}
    </div>
  );
}
