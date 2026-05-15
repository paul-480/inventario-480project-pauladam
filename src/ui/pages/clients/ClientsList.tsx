import { useState, useMemo } from "react";
import { useClients } from "@/ui/hooks/clients/useClients";
import { ClientCard } from "@/ui/components/clients/ClientCard";
import { NewClientModal } from "@/ui/components/clients/NewClientModal";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent } from "@/ui/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/ui/components/ui/toggle-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/components/ui/input-group";
import { Plus, SearchIcon } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

type StatusFilter = "ALL" | "ACTIVE" | "INACTIVE";

const ClientsList = () => {
    const { clients, loading, refetch } = useClients();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
    const [modalOpen, setModalOpen] = useState(false);

    const { scrollY } = useScroll();
    const maxWidth = useTransform(scrollY, [0, 100], ["1200px", "100%"]);
    const borderRadius = useTransform(scrollY, [0, 100], ["1.5rem", "1.5rem"]);

    const filtered = useMemo(() => {
        return clients.filter((c) => {
            const matchesSearch =
                search.trim() === "" ||
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.sector?.name.toLowerCase().includes(search.toLowerCase());

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && c.isActive) ||
                (statusFilter === "INACTIVE" && !c.isActive);

            return matchesSearch && matchesStatus;
        });
    }, [clients, search, statusFilter]);

    const skeletons = Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="col-span-1">
            <CardContent className="p-4">
                <Skeleton className="h-16 w-full" />
            </CardContent>
        </Card>
    ));

    return (
        <div className="flex flex-col gap-6 w-full pb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pt-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">Clientes</h1>
                    <p className="text-sm text-muted-foreground mt-1">Gestiona los clientes de la empresa</p>
                </div>
                <Button
                    onClick={() => setModalOpen(true)}
                    className="gap-1.5 self-start sm:self-auto"
                >
                    <Plus className="size-4" />
                    Nuevo Cliente
                </Button>
            </div>

            <div className="sticky top-0 z-30 py-4 -mx-4 px-4 backdrop-blur-md bg-background/60 border-2 rounded-2xl transition-colors duration-300">
                <motion.div
                    style={{ maxWidth, borderRadius }}
                    className="mx-auto w-full overflow-hidden shadow-lg border border-border"
                >
                    <Card className="border-none rounded-none shadow-none">
                        <CardContent className="flex flex-col md:flex-row gap-4 items-center p-4">
                            <ToggleGroup
                                type="single"
                                variant="outline"
                                value={statusFilter}
                                onValueChange={(v) => { if (v) setStatusFilter(v as StatusFilter); }}
                                className="justify-start"
                            >
                                <ToggleGroupItem value="ALL" className="rounded-full">Todos</ToggleGroupItem>
                                <ToggleGroupItem value="ACTIVE" className="rounded-full">Activos</ToggleGroupItem>
                                <ToggleGroupItem value="INACTIVE" className="rounded-full">Inactivos</ToggleGroupItem>
                            </ToggleGroup>

                            <div className="flex-1 w-full">
                                <InputGroup>
                                    <InputGroupInput
                                        type="text"
                                        placeholder="Buscar por nombre o sector…"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="bg-accent/5 rounded-full"
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <SearchIcon className="text-muted-foreground" />
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full auto-rows-fr px-4">
                <AnimatePresence mode="popLayout">
                    {loading
                        ? skeletons
                        : filtered.length === 0
                        ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full text-center text-muted-foreground py-16"
                            >
                                No se encontraron clientes con los filtros aplicados.
                            </motion.div>
                        )
                        : filtered.map((client) => (
                            <motion.div
                                key={client.id.value}
                                layout
                                className="h-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ClientCard client={client} />
                            </motion.div>
                        ))
                    }
                </AnimatePresence>
            </div>

            {!loading && (
                <p className="text-sm text-center text-muted-foreground pb-2">
                    Mostrando {filtered.length} de {clients.length} clientes
                </p>
            )}

            <NewClientModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                onSuccess={refetch}
            />
        </div>
    );
};

export default ClientsList;
