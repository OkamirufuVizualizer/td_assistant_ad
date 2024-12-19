// Database types
export interface Database {
  public: {
    Tables: {
      admin_dash: {
        Row: AdminDashRow;
        Insert: AdminDashInsert;
        Update: Partial<AdminDashInsert>;
      };
      techniques: {
        Row: TechniqueRow;
        Insert: TechniqueInsert;
        Update: Partial<TechniqueInsert>;
      };
      inspiration_projects: {
        Row: InspirationRow;
        Insert: InspirationInsert;
        Update: Partial<InspirationInsert>;
      };
      courses: {
        Row: CourseRow;
        Insert: CourseInsert;
        Update: Partial<CourseInsert>;
      };
    };
  };
}

// Base inspiration type matching the database schema exactly
export interface InspirationRow {
  id: string;
  title: string;
  author: string;
  description: string;
  image_url: string | null;
  video_url: string | null;
  likes: number | null;
  views: number | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

// Type for inserting new inspiration projects
export type InspirationInsert = Omit<InspirationRow, 'id' | 'created_at' | 'updated_at'>;

// AdminDash types
export interface AdminDashRow {
  id: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export type AdminDashInsert = Omit<AdminDashRow, 'id' | 'created_at' | 'updated_at'>;


// Base technique type matching the database schema exactly
export interface TechniqueRow {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: string;
  common_uses: string[];
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

// Type for inserting new techniques
export type TechniqueInsert = Omit<TechniqueRow, 'id' | 'created_at' | 'updated_at'>;

// Technique-specific types
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type TechniqueCategory = 
  | 'Animation'
  | 'Layout'
  | 'Performance'
  | 'Security'
  | 'Accessibility'
  | 'State Management'
  | 'Testing'
  | 'Other';

// Base course type matching the database schema exactly
export interface CourseRow {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  students: number | null;
  rating: number | null;
  image_url: string | null;
  url: string | null;
  is_coming_soon: boolean;
  created_at: string;
  updated_at: string;
}

// Type for inserting new courses (omitting auto-generated fields)
export type CourseInsert = Omit<CourseRow, 'id' | 'created_at' | 'updated_at'>;

// Form-specific types
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface FormField {
  label: string;
  name: keyof CourseInsert;
  type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox' | 'url';
  required?: boolean;
  options?: string[];
  placeholder?: string;
}