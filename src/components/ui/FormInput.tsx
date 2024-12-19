import React from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type: string;
  value: string | number | boolean | null;
  onChange: (value: any) => void;
  required?: boolean;
  placeholder?: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  placeholder,
  error
}) => {
  if (type === 'checkbox') {
    return (
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={name}
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className={`rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
            error ? 'border-red-500' : ''
          }`}
        />
        <label htmlFor={name} className="text-sm font-medium dark:text-white">
          {label}
        </label>
        {error && <span className="text-sm text-red-500 ml-2">{error}</span>}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1 dark:text-white">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value === null ? '' : value}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full rounded-md border p-2 dark:bg-gray-700 dark:text-white ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};