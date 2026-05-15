import type { UseFormReturn } from "react-hook-form";
import type { AddUserValues } from "@/ui/hooks/project/useAddUserModal";
import { Button } from "@/ui/components/ui/button";
import { Alert, AlertDescription } from "@/ui/components/ui/alert";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/components/ui/dialog";
import { FormSelect } from "@/ui/components/forms/common/FormSelect";
import { UserPlus } from "lucide-react";

interface AddProjectMemberModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    form: UseFormReturn<AddUserValues>;
    onSubmit: (data: AddUserValues) => Promise<void>;
    userOptions: { value: string; label: string }[];
    roleOptions: { value: string; label: string }[];
}

export function AddProjectMemberModal({ open, onOpenChange, form, onSubmit, userOptions, roleOptions }: AddProjectMemberModalProps) {
    return (
        <Dialog open={open} onOpenChange={(open) => { onOpenChange(open); if (!open) form.reset(); }}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserPlus className="size-5 text-primary" />
                        Añadir miembro al proyecto
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormSelect control={form.control} name="app_user_id" label="Usuario *" options={userOptions} placeholder="Selecciona un usuario" />
                    <FormSelect control={form.control} name="project_role_id" label="Rol *" options={roleOptions} placeholder="Selecciona un rol" />
                    {form.formState.errors.root && (
                        <Alert variant="destructive">
                            <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                        </Alert>
                    )}
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Añadiendo..." : "Añadir"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
