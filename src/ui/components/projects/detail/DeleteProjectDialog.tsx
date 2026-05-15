import { Button } from "@/ui/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/ui/components/ui/dialog";

interface DeleteProjectDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    projectName: string;
    loading: boolean;
    onConfirm: () => void;
}

export function DeleteProjectDialog({ open, onOpenChange, projectName, loading, onConfirm }: DeleteProjectDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>¿Eliminar proyecto?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">
                    Esta acción es irreversible. Se eliminará el proyecto <strong>{projectName}</strong> y todos sus datos asociados.
                </p>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} disabled={loading}>
                        {loading ? "Eliminando..." : "Eliminar"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
