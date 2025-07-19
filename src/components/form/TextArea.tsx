import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
}

export default function TextArea({ name, label, placeholder }: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <textarea {...register(name)} placeholder={placeholder} className="border rounded px-3 py-2 w-full h-24" />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{(errors[name] as any)?.message}</p>}
    </div>
  );
}
