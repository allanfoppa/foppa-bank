import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { DependencyProvider } from './ui/contexts/DependenciesContext';
import { AuthProvider } from './ui/contexts/AuthContext';
import { AppRoutes } from './ui/router/routes';

function App() {
  return (
    <BrowserRouter>
      <DependencyProvider>
        <AuthProvider>
          <Toaster position="top-right" />
          <AppRoutes />
        </AuthProvider>
      </DependencyProvider>
    </BrowserRouter>
  );
}
export default App;