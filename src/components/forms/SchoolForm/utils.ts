import { CourseInsert } from '../../../types/database';

export const validateForm = (data: CourseInsert) => {
  const errors: Partial<Record<keyof CourseInsert, string>> = {};

  // Required fields validation
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  if (!data.duration) {
    errors.duration = 'Duration is required';
  }

  if (!data.level) {
    errors.level = 'Level is required';
  }

  // URL validations
  if (data.image_url && !isValidUrl(data.image_url)) {
    errors.image_url = 'Please enter a valid URL';
  }

  if (data.url && !isValidUrl(data.url)) {
    errors.url = 'Please enter a valid URL';
  }

  // Numeric validations
  if (typeof data.students === 'number' && data.students < 0) {
    errors.students = 'Students cannot be negative';
  }

  if (typeof data.rating === 'number') {
    if (data.rating < 0) {
      errors.rating = 'Rating cannot be negative';
    }
    if (data.rating > 5) {
      errors.rating = 'Rating cannot be greater than 5';
    }
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