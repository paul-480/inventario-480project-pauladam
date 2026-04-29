import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm,Controller, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/application/auth/useAuth';
import { loginSchema } from '@/application/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '@/ui/components/ui/label';
import { Input } from '@/ui/components/ui/input';
import { Alert, AlertDescription } from '@/ui/components/ui/alert';
import { Button } from '@/ui/components/ui/button';

type Credentials = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<Credentials>({
    resolver: zodResolver(loginSchema)
  });
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  console.log("Estado del formulario - errores:", errors, "isLoading:", isLoading);


  const onSubmit: SubmitHandler<Credentials> = async (e) => {
    console.log("Formulario enviado con:", e);
    console.log("Estado de carga:", isLoading);
    try {
      await login(e.email, e.password);
      console.log("¡Login exitoso!");
      navigate('/');

    } catch (err) {
      console.error("Fallo en el login:", err);
      setError("root", {
        type: "manual",
        message: "Credenciales inválidas. Por favor, inténtalo de nuevo.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className='space-y-2'>
        <Label htmlFor="email">Correo Corporativo</Label>
        <Input
          id="email"
          type="email"
          placeholder="tu.nombre@480.com"
          className="w-full"
          {...register('email')} />
        {errors.email && <Alert variant="destructive"><AlertDescription>{errors.email.message}</AlertDescription></Alert>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="w-full"
          {...register('password')} />
        {errors.password && <Alert variant="destructive"><AlertDescription>{errors.password.message}</AlertDescription></Alert>}
      </div>
      {errors.root && (
        <Alert variant="destructive">
          <AlertDescription>{errors.root.message}</AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
        {isLoading ? 'Entrando...' : 'Iniciar Sesión'}
      </Button>
    </form>
  );
}
