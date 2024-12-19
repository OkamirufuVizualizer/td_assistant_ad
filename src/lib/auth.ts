import { supabase } from './supabase';
import { AdminDashRow } from '../types/database';

const handleAuthError = (error: any, context: string) => {
  console.error(`${context}:`, error);
  if (error.code === 'PGRST116') {
    throw new Error('Unauthorized access. Only administrators can log in.');
  }
  throw error;
};

export const signIn = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  try {
    // First attempt to authenticate
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user data returned');

    // Then check if the user is an admin
    const { data: adminData, error: adminError } = await supabase
      .from('admin_dash')
      .select('*')
      .eq('email', email)
      .single();

    if (adminError) {
      // If admin check fails, sign out and throw error
      await supabase.auth.signOut();
      handleAuthError(adminError, 'Admin check error');
    }

    if (!adminData) {
      await supabase.auth.signOut();
      throw new Error('Unauthorized access. Only administrators can log in.');
    }

    return { user: authData.user, admin: adminData };
  } catch (error) {
    // Ensure user is signed out on any error
    await supabase.auth.signOut();
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return null;

    const { data: adminData, error: adminError } = await supabase
      .from('admin_dash')
      .select('*')
      .eq('email', user.email)
      .single();

    if (adminError) {
      handleAuthError(adminError, 'Admin check error');
    }

    if (!adminData) {
      await signOut();
      return null;
    }

    return { user, admin: adminData };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};