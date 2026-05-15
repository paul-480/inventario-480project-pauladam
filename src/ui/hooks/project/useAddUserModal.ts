import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const addUserSchema = z.object({
    app_user_id: z.string().min(1, "Selecciona un usuario"),
    project_role_id: z.string().min(1, "Selecciona un rol"),
});
export type AddUserValues = z.infer<typeof addUserSchema>;

export function useAddUserModal(
    addUser: (payload: { app_user_id: string; project_role_id: string }) => Promise<any>
) {
    const [addUserModalOpen, setAddUserModalOpen] = useState(false);

    const addUserForm = useForm<AddUserValues>({
        resolver: zodResolver(addUserSchema),
        defaultValues: { app_user_id: "", project_role_id: "" },
    });

    const openAddUserModal = useCallback(() => {
        addUserForm.reset();
        setAddUserModalOpen(true);
    }, [addUserForm]);

    const onAddUser = async (data: AddUserValues) => {
        try {
            await addUser({ app_user_id: data.app_user_id, project_role_id: data.project_role_id });
            addUserForm.reset();
            setAddUserModalOpen(false);
        } catch {
            addUserForm.setError("root", { message: "No se pudo añadir el usuario." });
        }
    };

    return { addUserModalOpen, setAddUserModalOpen, addUserForm, openAddUserModal, onAddUser };
}
