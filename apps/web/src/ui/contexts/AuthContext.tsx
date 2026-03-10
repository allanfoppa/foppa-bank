import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../../core/domain/entities/User';
import { useDependencies } from './DependenciesContext';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  handleLogin: (email: string, pass: string) => Promise<void>;
  handleLogout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { loginUseCase, logoutUseCase } = useDependencies();

  useEffect(() => {
    // Check for stored user session on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email: string, pass: string) => {
    const loggedUser = await loginUseCase.execute(email, pass);
    setUser(loggedUser);
    localStorage.setItem('user', JSON.stringify(loggedUser));
  };

  const handleLogout = () => {
    logoutUseCase.execute();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
