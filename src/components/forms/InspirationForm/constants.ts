import { FormField, InspirationInsert } from '../../../types/database';

export const INITIAL_STATE: InspirationInsert = {
  title: '',
  author: '',
  description: '',
  image_url: '',
  video_url: '',
  likes: 0,
  views: 0,
  tags: []
};

export const FORM_FIELDS: FormField[] = [
  { label: 'Title', name: 'title', type: 'text', required: true },
  { label: 'Author', name: 'author', type: 'text', required: true },
  { label: 'Description', name: 'description', type: 'textarea', required: true },
  { 
    label: 'Image URL', 
    name: 'image_url', 
    type: 'url', 
    placeholder: 'https://example.com/image.jpg' 
  },
  { 
    label: 'Video URL', 
    name: 'video_url', 
    type: 'url', 
    placeholder: 'https://youtube.com/watch?v=...' 
  },
  { label: 'Tags', name: 'tags', type: 'tags' }
];