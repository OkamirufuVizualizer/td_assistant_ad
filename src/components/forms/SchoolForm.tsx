import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';
import { FormField, SchoolEntry, CourseLevel } from '../../types/database';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { FormTextArea } from '../ui/FormTextArea';

const DURATION_OPTIONS = [
  '1-2 hours',
  '2-4 hours',
  '4-6 hours',
  '6-8 hours',
  '8+ hours'
];

const LEVEL_OPTIONS: CourseLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels'
];

const INITIAL_STATE: SchoolEntry = {
  title: '',
  description: '',
  duration: DURATION_OPTIONS[0],
  level: LEVEL_OPTIONS[0],
  students: 0,
  rating: 0,
  image_url: '',
  url: '',
  is_coming_soon: false
};

const FORM_FIELDS: FormField[] = [
  { label: 'Title', name: 'title', type: 'text', required: true },
  { label: 'Description', name: 'description', type: 'textarea', required: true },
  { label: 'Duration', name: 'duration', type: 'select', required: true, options: DURATION_OPTIONS },
  { label: 'Level', name: 'level', type: 'select', required: true, options: LEVEL_OPTIONS },
  { label: 'Students', name: 'students', type: 'number', placeholder: '0' },
  { label: 'Rating', name: 'rating', type: 'number', placeholder: '0.0' },
  { label: 'Image URL', name: 'image_url', type: 'url', placeholder: 'https://example.com/image.jpg' },
  { label: 'Course URL', name: 'url', type: 'url', placeholder: 'https://example.com/course' },
  { label: 'Coming Soon', name: 'is_coming_soon', type: 'checkbox' }
];

interface SchoolFormProps {
  onClose: () => void;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<SchoolEntry>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (name: keyof SchoolEntry, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('school')
        .insert([formData]);

      if (error) throw error;

      toast.success('Course added successfully!');
      onClose();
    } catch (error) {
      toast.error('Error adding course');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {FORM_FIELDS.map((field) => {
          if (field.type === 'select') {
            return (
              <FormSelect
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] as string}
                options={field.options || []}
                required={field.required}
                onChange={(value) => handleChange(field.name, value)}
              />
            );
          } else if (field.type === 'textarea') {
            return (
              <FormTextArea
                key={field.name}
                label={field.label}
                name={field.name}
                value={formData[field.name] as string}
                required={field.required}
                onChange={(value) => handleChange(field.name, value)}
              />
            );
          } else {
            return (
              <FormInput
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                required={field.required}
                placeholder={field.placeholder}
                onChange={(value) => handleChange(field.name, value)}
              />
            );
          }
        })}
      </div>

      {/* Fixed Footer with Buttons */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 mt-6 flex justify-end space-x-2 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Course'}
        </button>
      </div>
    </>
  );
};