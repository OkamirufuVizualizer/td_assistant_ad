import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { AdminDashRow } from '../types/database';
import { getCurrentUser, signOut } from '../lib/auth';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  admin: AdminDashRow | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  admin: null,
  isLoading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<AdminDashRow | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      setAdmin(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initAuth = async (session: Session | null) => {
      try {
        console.log('Auth state changed:', session?.user?.email);
        if (session?.user) {
          const data = await getCurrentUser();
          console.log('Current user data:', data);
          if (data) {
            setUser(data.user);
            setAdmin(data.admin);
          } else {
            // If getCurrentUser returns null, sign out
            console.log('No user data, signing out');
            await handleSignOut();
            setUser(null);
            setAdmin(null);
          }
        } else {
          console.log('No session, clearing state');
          setUser(null);
          setAdmin(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Initialize with current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      initAuth(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      initAuth(session);
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, admin, isLoading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};