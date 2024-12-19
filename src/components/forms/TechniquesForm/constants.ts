import { FormField, TechniqueInsert, DifficultyLevel, TechniqueCategory } from '../../../types/database';

export const DIFFICULTY_LEVELS: DifficultyLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert'
];

export const CATEGORIES: TechniqueCategory[] = [
  'Animation',
  'Layout',
  'Performance',
  'Security',
  'Accessibility',
  'State Management',
  'Testing',
  'Other'
];

export const INITIAL_STATE: TechniqueInsert = {
  name: '',
  category: CATEGORIES[0],
  description: '',
  difficulty: DIFFICULTY_LEVELS[0],
  common_uses: [],
  image_url: ''
};

export const FORM_FIELDS: FormField[] = [
  { label: 'Name', name: 'name', type: 'text', required: true },
  { 
    label: 'Category', 
    name: 'category', 
    type: 'select', 
    required: true,
    options: CATEGORIES 
  },
  { label: 'Description', name: 'description', type: 'textarea', required: true },
  { 
    label: 'Difficulty', 
    name: 'difficulty', 
    type: 'select', 
    required: true,
    options: DIFFICULTY_LEVELS 
  },
  { label: 'Common Uses', name: 'common_uses', type: 'tags', required: true },
  { 
    label: 'Image URL', 
    name: 'image_url', 
    type: 'url', 
    placeholder: 'https://example.com/image.jpg' 
  }
];