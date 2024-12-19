import React from 'react';
import { FormField, CourseInsert } from '../../../types/database';
import { FormInput } from '../../ui/FormInput';
import { FormSelect } from '../../ui/FormSelect';
import { FormTextArea } from '../../ui/FormTextArea';
import { FORM_FIELDS } from './constants';

interface FormFieldsProps {
  formData: CourseInsert;
  onChange: (name: keyof CourseInsert, value: any) => void;
  errors: Partial<Record<keyof CourseInsert, string>>;
}

export const FormFields: React.FC<FormFieldsProps> = ({ formData, onChange, errors }) => {
  const renderField = (field: FormField) => {
    const commonProps: Omit<any, 'key'> = {
      label: field.label,
      name: field.name,
      required: field.required,
      error: errors[field.name],
      onChange: (value: any) => onChange(field.name, value)
    };

    if (field.type === 'select') {
      return (
        <FormSelect
          key={field.name}
          {...commonProps}
          value={formData[field.name] as string}
          options={field.options || []}
        />
      );
    }

    if (field.type === 'textarea') {
      return (
        <FormTextArea
          key={field.name}
          {...commonProps}
          value={formData[field.name] as string}
        />
      );
    }

    return (
      <FormInput
        key={field.name}
        {...commonProps}
        type={field.type}
        value={formData[field.name]}
        placeholder={field.placeholder}
      />
    );
  };

  return (
    <div className="space-y-4 flex-1 overflow-y-auto max-h-[calc(100vh-16rem)]">
      {FORM_FIELDS.map(renderField)}
    </div>
  );
};