
import { useEffect } from 'react';
import { ThemeProvider } from "next-themes";
import AppRouter from './ui/routes/AppRouter';
import { useAuth } from './application/auth/useAuth';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { SidebarProvider } from './ui/components/ui/sidebar';

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
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
    </ThemeProvider>

  );
}

export default App;
