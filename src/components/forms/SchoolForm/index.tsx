import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import { CourseInsert } from '../../../types/database';
import { FormFields } from './FormFields';
import { FormActions } from './FormActions';
import { INITIAL_STATE } from './constants';
import { validateForm } from './utils';

interface SchoolFormProps {
  onClose: () => void;
}

export const SchoolForm: React.FC<SchoolFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<CourseInsert>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CourseInsert, string>>>({});

  const handleChange = (name: keyof CourseInsert, value: string | number | boolean | null) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is modified
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);

    // Prepare data for submission
    const submissionData = {
      ...formData,
      // Convert empty strings to null for optional URL fields
      image_url: formData.image_url || null,
      url: formData.url || null,
      // Ensure numeric fields are properly typed
      students: formData.students === null ? 0 : formData.students,
      rating: formData.rating === null ? 0 : formData.rating
    };

    try {
      const { error } = await supabase
        .from('courses')
        .insert([submissionData])
        .select();

      if (error) throw error;

      toast.success('Course added successfully!');
      onClose();
    } catch (error: any) {
      const errorMessage = error.message === 'new row violates row-level security policy for table "courses"'
        ? 'Permission denied. Please check your database access rights.'
        : error.message || 'Error adding course';
      toast.error(errorMessage);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col h-full overflow-hidden">
      <FormFields 
        formData={formData} 
        onChange={handleChange} 
        errors={errors}
      />
      <FormActions 
        onClose={onClose} 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </form>
  );
};