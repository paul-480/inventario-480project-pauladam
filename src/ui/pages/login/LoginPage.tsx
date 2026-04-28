
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/application/auth/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
          <li>Admin: ana.garcia@480.com / admin123</li>
          <li>PM: carlos.rodriguez@480.com / pm123</li>
          <li>Dev: maria.lopez@480.com / dev123</li>
        </ul>
      </div>
        </CardContent>
      </Card>
    </div>
  );


}