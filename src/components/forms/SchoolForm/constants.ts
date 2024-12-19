import { FormField, CourseInsert } from '../../../types/database';

export const DURATION_OPTIONS = [
  '1-2 hours',
  '2-4 hours',
  '4-6 hours',
  '6-8 hours',
  '8+ hours'
] as const;

export const LEVEL_OPTIONS = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'All Levels'
] as const;

export const INITIAL_STATE: CourseInsert = {
  title: '',
  description: '',
  duration: DURATION_OPTIONS[0],
  level: LEVEL_OPTIONS[0],
  students: null,
  rating: null,
  image_url: '',
  url: '',
  is_coming_soon: false
};

export const FORM_FIELDS: FormField[] = [
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