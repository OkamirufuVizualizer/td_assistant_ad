import { TechniqueInsert } from '../../../types/database';

export const validateForm = (data: TechniqueInsert) => {
  const errors: Partial<Record<keyof TechniqueInsert, string>> = {};

  // Required fields validation
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  if (!data.difficulty) {
    errors.difficulty = 'Difficulty is required';
  }

  if (!data.common_uses || data.common_uses.length === 0) {
    errors.common_uses = 'At least one common use is required';
  }

  // URL validation
  if (data.image_url && !isValidUrl(data.image_url)) {
    errors.image_url = 'Please enter a valid URL';
  }

  return errors;
};

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};