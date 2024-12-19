import React from 'react';
import { FormField, InspirationInsert } from '../../../types/database';
import { FormInput } from '../../ui/FormInput';
import { FormTextArea } from '../../ui/FormTextArea';
import { FormTags } from '../../ui/FormTags';
import { FORM_FIELDS } from './constants';

interface FormFieldsProps {
  formData: InspirationInsert;
  onChange: (name: keyof InspirationInsert, value: any) => void;
  errors: Partial<Record<keyof InspirationInsert, string>>;
}

export const FormFields: React.FC<FormFieldsProps> = ({ formData, onChange, errors }) => {
  const renderField = (field: FormField) => {
    const commonProps = {
      label: field.label,
      name: field.name,
      required: field.required,
      error: errors[field.name],
      onChange: (value: any) => onChange(field.name, value)
    };

    if (field.type === 'textarea') {
      return (
        <FormTextArea
          key={field.name}
          {...commonProps}
          value={formData[field.name] as string}
        />
      );
    }

    if (field.type === 'tags') {
      return (
        <FormTags
          key={field.name}
          {...commonProps}
          value={formData[field.name] as string[]}
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