import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { useAuth } from '@/application/auth/useAuth';
import { loginSchema } from '@/application/auth/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/ui/components/ui/input';
import { Alert, AlertDescription } from '@/ui/components/ui/alert';
import { Button } from '@/ui/components/ui/button';
import { Field, FieldError, FieldLabel } from '../../ui/field';
import { FormInput } from '../common/FormInput';

type Credentials = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors }
    } = useForm<Credentials>({
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email: '',
            password: ''
        }
    });
    const navigate = useNavigate();
    const { login, isLoading } = useAuth();

    console.log("Estado del formulario - errores:", errors, "isLoading:", isLoading);


    const onSubmit: SubmitHandler<Credentials> = async (e) => {

        try {
            await login(e.email, e.password);
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
            <FormInput control={control} name="email" label="Correo Corporativo" type="email" placeholder="tu.nombre@480.com" />
            <FormInput control={control} name="password" label="Contraseña" type="password" placeholder="••••••••" />    
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


