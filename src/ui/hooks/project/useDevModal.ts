import { useCallback, useState } from "react";
import { v7 as uuidv7 } from "uuid";
import type { Development } from "@/domain/development/development.entity";
import type { CreateDevelopmentSchema, UpdateDevelopmentSchema } from "@/infrastructure/development/development.schema";

type SubmitData = Omit<UpdateDevelopmentSchema, "links"> & { links?: UpdateDevelopmentSchema["links"] };

export function useDevModal(
    createDevelopment: (data: CreateDevelopmentSchema) => Promise<Development | null | undefined>,
    updateDevelopment: (id: string, data: UpdateDevelopmentSchema) => Promise<Development | null | undefined>
) {
    const [devModalOpen, setDevModalOpen] = useState(false);
    const [editingDev, setEditingDev] = useState<Development | null>(null);

    const openDevModal = useCallback((dev: Development | null = null) => {
        setEditingDev(dev);
        setDevModalOpen(true);
    }, []);

    const closeDevModal = useCallback(() => {
        setDevModalOpen(false);
        setEditingDev(null);
    }, []);

    const handleDevSubmit = useCallback(async (data: SubmitData) => {
        if (editingDev) {
            await updateDevelopment(editingDev.id.value, data);
        } else {
            await createDevelopment({ id: uuidv7(), ...data });
        }
        closeDevModal();
    }, [editingDev, createDevelopment, updateDevelopment, closeDevModal]);

    return { devModalOpen, editingDev, openDevModal, closeDevModal, handleDevSubmit };
}
