import React, { useRef, useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

interface ImageUploadButtonProps {
  name: string;
  label: string;
  required?: boolean;
  accept?: string;
  multiple?: boolean;
  onChange?: any;
  className?: string; // for Tailwind classes or custom styling
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  name,
  label,
  required = false,
  accept = "image/*",
  multiple = false,
  onChange,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { ref: registerRef, onChange: rhfOnChange, ...inputProps } = register(name, { required });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Handle file input change
  const handleFileChange = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    if (onChange) {
      onChange(files);
    }
  };

  // Create image previews
  useEffect(() => {
    if (selectedFiles.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(objectUrls);

    // Cleanup on unmount or when files change
    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedFiles]);

  // Remove a selected file at given index
  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    // Update the input ref's FileList accordingly (clear and re-add)
    if (inputRef.current) {
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      inputRef.current.files = dataTransfer.files;
      // Trigger onChange prop callback with updated files, or null if none
      if (onChange) {
        onChange(dataTransfer.files.length ? dataTransfer.files : null);
      }
    }
  };

  // Click handler to trigger file dialog
  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <label
        htmlFor={name}
        className={`cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 ${className}`}
        onClick={handleClick}
      >
        {label}
      </label>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        {...inputProps}
        ref={(e) => {
          registerRef(e);
          inputRef.current = e;
        }}
        onChange={(e) => {
          rhfOnChange(e); // react-hook-form tracking
          handleFileChange(e.target.files); // preview logic
          onChange?.(e); // your custom handler from props
        }}
      />
      {errors && errors[name] && (
        <p className="text-red-600 text-sm mt-1">{errors[name]?.message?.toString() || "This field is required"}</p>
      )}

      {/* Preview images and file names with remove buttons */}
      {previews.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-4">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex flex-col items-center border p-2 rounded">
              <img src={previews[index]} alt={file.name} className="w-20 h-20 object-contain rounded" />
              <p className="text-xs mt-1 text-center break-words max-w-[80px]">{file.name}</p>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="mt-1 px-2 py-1 text-xs text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadButton;
