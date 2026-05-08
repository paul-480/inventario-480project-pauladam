
import { useEffect } from 'react';
import AppRouter from './ui/routes/AppRouter';
import { useAuth } from './application/auth/useAuth';

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <AppRouter />
  );
}

export default App;
