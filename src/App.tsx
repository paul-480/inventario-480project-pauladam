
import { useEffect } from 'react';
import { ThemeProvider } from "next-themes";
import AppRouter from './ui/routes/AppRouter';
import { useAuth } from './application/auth/useAuth';

function App() {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
    >
      <AppRouter />
    </ThemeProvider>

  );
}

export default App;
