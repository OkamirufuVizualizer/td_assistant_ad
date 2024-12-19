import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FormTagsProps {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export const FormTags: React.FC<FormTagsProps> = ({
  label,
  value = [],
  onChange,
  error
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !value.includes(tag)) {
        onChange([...value, tag]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1 dark:text-white">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700">
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
            >
              <X size={14} />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add tags"
          className="flex-1 min-w-[200px] outline-none bg-transparent dark:text-white"
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};