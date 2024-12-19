import { InspirationInsert } from '../../../types/database';

export const validateForm = (data: InspirationInsert) => {
  const errors: Partial<Record<keyof InspirationInsert, string>> = {};

  // Required fields validation
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  }

  if (!data.author.trim()) {
    errors.author = 'Author is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  // URL validations
  if (data.image_url && !isValidUrl(data.image_url)) {
    errors.image_url = 'Please enter a valid URL';
  }

  if (data.video_url && !isValidUrl(data.video_url)) {
    errors.video_url = 'Please enter a valid URL';
  }

  // Numeric validations
  if (typeof data.likes === 'number' && data.likes < 0) {
    errors.likes = 'Likes cannot be negative';
  }

  if (typeof data.views === 'number' && data.views < 0) {
    errors.views = 'Views cannot be negative';
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