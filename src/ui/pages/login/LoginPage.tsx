
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/application/auth/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/ui/components/ui/card';
import Logo from '@/ui/components/common/Logo';
import LoginForm from '@/ui/components/forms/login/LoginForm';




export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto">
            <Logo size="xl" />
          </div>
          <CardTitle className="text-2xl">Gestión de Proyectos</CardTitle>
          <CardDescription>
            Ingresa con tu correo corporativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
        <p className="font-semibold mb-2">Usuarios de prueba:</p>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>Admin: ana@empresa.com / 12345678</li>
          <li>PM: carlos@empresa.com / 12346578</li>
          <li>Dev: lucia@empresa.com / 12345678</li>
        </ul>
      </div>
        </CardContent>
      </Card>
    </div>
  );


}