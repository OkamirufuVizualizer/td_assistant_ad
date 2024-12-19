import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';
import { TechniqueInsert } from '../../../types/database';
import { FormFields } from './FormFields';
import { FormActions } from './FormActions';
import { INITIAL_STATE } from './constants';
import { validateForm } from './utils';

interface TechniquesFormProps {
  onClose: () => void;
}

export const TechniquesForm: React.FC<TechniquesFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<TechniqueInsert>(INITIAL_STATE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TechniqueInsert, string>>>({});

  const handleChange = (name: keyof TechniqueInsert, value: any) => {
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
      common_uses: formData.common_uses || []
    };

    try {
      const { error } = await supabase
        .from('techniques')
        .insert([submissionData])
        .select();

      if (error) throw error;

      toast.success('Technique added successfully!');
      onClose();
    } catch (error: any) {
      const errorMessage = error.message === 'new row violates row-level security policy for table "techniques"'
        ? 'Permission denied. Please check your database access rights.'
        : error.message || 'Error adding technique';
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