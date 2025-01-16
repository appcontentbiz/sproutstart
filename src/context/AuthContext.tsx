import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'free' | 'premium';
  preferences?: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API calls - replace with real API calls in production
const mockAuthAPI = {
  login: async (email: string, password: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate API validation
    if (email === 'test@example.com' && password === 'password') {
      return {
        id: '1',
        email,
        name: 'Test User',
        role: 'free',
        preferences: {
          notifications: true,
          theme: 'light'
        }
      };
    }
    throw new Error('Invalid credentials');
  },

  register: async (email: string, password: string, name: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate registration
    return {
      id: '1',
      email,
      name,
      role: 'free',
      preferences: {
        notifications: true,
        theme: 'light'
      }
    };
  },

  resetPassword: async (email: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate password reset email
    console.log(`Password reset email sent to ${email}`);
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await mockAuthAPI.login(email, password);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      setError(null);
      const user = await mockAuthAPI.register(email, password, name);
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await mockAuthAPI.resetPassword(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const updatedUser = { ...user, ...updates } as User;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        resetPassword,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
