import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import { InspirationInsert } from '../../../types/database';
import { FormFields } from './FormFields';
import { FormActions } from './FormActions';
import { INITIAL_STATE } from './constants';
import { validateForm } from './utils';

interface InspirationFormProps {
  onClose: () => void;
}

export const InspirationForm: React.FC<InspirationFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<InspirationInsert>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InspirationInsert, string>>>({});

  const handleChange = (name: keyof InspirationInsert, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
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

    const submissionData = {
      ...formData,
      image_url: formData.image_url || null,
      video_url: formData.video_url || null,
      likes: formData.likes || 0,
      views: formData.views || 0,
      tags: formData.tags || []
    };

    try {
      const { error } = await supabase
        .from('inspiration_projects')
        .insert([submissionData])
        .select();

      if (error) throw error;

      toast.success('Project added successfully!');
      onClose();
    } catch (error: any) {
      const errorMessage = error.message === 'new row violates row-level security policy for table "inspiration_projects"'
        ? 'Permission denied. Please check your database access rights.'
        : error.message || 'Error adding project';
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