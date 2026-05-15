import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/ui/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/ui/components/ui/dialog";
import { Alert, AlertDescription } from "@/ui/components/ui/alert";
import { Label } from "@/ui/components/ui/label";
import { Input } from "@/ui/components/ui/input";
import { useChangePassword } from "@/ui/hooks/user/useChangePassword";
import { Eye, EyeOff, KeyRound } from "lucide-react";

const selfSchema = z
    .object({
        current_password: z.string().min(1, "Introduce tu contraseña actual"),
        new_password: z.string().min(6, "Mínimo 6 caracteres"),
        confirm_password: z.string().min(1, "Confirma la nueva contraseña"),
    })
    .refine((d) => d.new_password === d.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

const adminSchema = z
    .object({
        new_password: z.string().min(6, "Mínimo 6 caracteres"),
        confirm_password: z.string().min(1, "Confirma la nueva contraseña"),
    })
    .refine((d) => d.new_password === d.confirm_password, {
        message: "Las contraseñas no coinciden",
        path: ["confirm_password"],
    });

type SelfFormValues = z.infer<typeof selfSchema>;
type AdminFormValues = z.infer<typeof adminSchema>;

interface ChangePasswordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    userId: string;
    isAdminOverride: boolean;
}

function PasswordField({
    id,
    label,
    placeholder,
    error,
    registration,
}: {
    id: string;
    label: string;
    placeholder: string;
    error?: string;
    registration: object;
}) {
    const [show, setShow] = useState(false);
    return (
        <div className="space-y-1.5">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                <Input
                    id={id}
                    type={show ? "text" : "password"}
                    placeholder={placeholder}
                    className="pr-10"
                    {...registration}
                />
                <button
                    type="button"
                    onClick={() => setShow((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                >
                    {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
        </div>
    );
}

export function ChangePasswordModal({ open, onOpenChange, userId, isAdminOverride }: ChangePasswordModalProps) {
    const { changePassword, adminChangePassword, loading } = useChangePassword();

    const selfForm = useForm<SelfFormValues>({
        resolver: zodResolver(selfSchema),
        defaultValues: { current_password: "", new_password: "", confirm_password: "" },
    });

    const adminForm = useForm<AdminFormValues>({
        resolver: zodResolver(adminSchema),
        defaultValues: { new_password: "", confirm_password: "" },
    });

    const form = isAdminOverride ? adminForm : selfForm;

    const handleClose = (open: boolean) => {
        if (!open) {
            selfForm.reset();
            adminForm.reset();
        }
        onOpenChange(open);
    };

    const onSelfSubmit: SubmitHandler<SelfFormValues> = async (data) => {
        try {
            await changePassword(userId, data.current_password, data.new_password);
            handleClose(false);
        } catch {
            selfForm.setError("root", { message: "Contraseña actual incorrecta o error del servidor." });
        }
    };

    const onAdminSubmit: SubmitHandler<AdminFormValues> = async (data) => {
        try {
            await adminChangePassword(userId, data.new_password);
            handleClose(false);
        } catch {
            adminForm.setError("root", { message: "No se pudo cambiar la contraseña. Intenta de nuevo." });
        }
    };

    const rootError = (form.formState.errors as { root?: { message?: string } }).root?.message;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-lg">
                        <KeyRound className="size-5 text-primary" />
                        Cambiar Contraseña
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        {isAdminOverride
                            ? "Establece una nueva contraseña para este usuario."
                            : "Introduce tu contraseña actual y elige una nueva."}
                    </p>
                </DialogHeader>

                {isAdminOverride ? (
                    <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} noValidate className="space-y-4 pt-1">
                        <PasswordField
                            id="new_password"
                            label="Nueva contraseña"
                            placeholder="Mínimo 6 caracteres"
                            error={adminForm.formState.errors.new_password?.message}
                            registration={adminForm.register("new_password")}
                        />
                        <PasswordField
                            id="confirm_password"
                            label="Confirmar nueva contraseña"
                            placeholder="Repite la nueva contraseña"
                            error={adminForm.formState.errors.confirm_password?.message}
                            registration={adminForm.register("confirm_password")}
                        />
                        {rootError && (
                            <Alert variant="destructive">
                                <AlertDescription>{rootError}</AlertDescription>
                            </Alert>
                        )}
                        <div className="flex justify-end gap-2 pt-1">
                            <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading}>
                                <KeyRound className="size-4 mr-1.5" />
                                {loading ? "Cambiando..." : "Cambiar"}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={selfForm.handleSubmit(onSelfSubmit)} noValidate className="space-y-4 pt-1">
                        <PasswordField
                            id="current_password"
                            label="Contraseña actual"
                            placeholder="Tu contraseña actual"
                            error={selfForm.formState.errors.current_password?.message}
                            registration={selfForm.register("current_password")}
                        />
                        <PasswordField
                            id="new_password_self"
                            label="Nueva contraseña"
                            placeholder="Mínimo 6 caracteres"
                            error={selfForm.formState.errors.new_password?.message}
                            registration={selfForm.register("new_password")}
                        />
                        <PasswordField
                            id="confirm_password_self"
                            label="Confirmar nueva contraseña"
                            placeholder="Repite la nueva contraseña"
                            error={selfForm.formState.errors.confirm_password?.message}
                            registration={selfForm.register("confirm_password")}
                        />
                        {rootError && (
                            <Alert variant="destructive">
                                <AlertDescription>{rootError}</AlertDescription>
                            </Alert>
                        )}
                        <div className="flex justify-end gap-2 pt-1">
                            <Button type="button" variant="outline" onClick={() => handleClose(false)} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button type="submit" disabled={loading}>
                                <KeyRound className="size-4 mr-1.5" />
                                {loading ? "Cambiando..." : "Cambiar"}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
