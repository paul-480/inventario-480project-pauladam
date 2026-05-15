import { useState } from "react";
import { Card, CardContent } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { ToggleGroup, ToggleGroupItem } from "@/ui/components/ui/toggle-group";
import CustomUserCard from "@/ui/components/user/CustomUserCard";
import { NewUserModal } from "@/ui/components/user/NewUserModal";
import { useUsers, type FilterOption } from "@/ui/hooks/user/useUsers";
import { useAuth } from "@/application/auth/useAuth";
import { Button } from "@/ui/components/ui/button";
import { Plus, SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/ui/components/ui/input-group";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const UserList = () => {
  const { filteredUsers: users, loading, filter, setFilter, setSearchText } = useUsers();
  const { isAdmin } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const { scrollY } = useScroll();

  const maxWidth = useTransform(scrollY, [0, 100], ["1200px", "100%"]);
  const borderRadius = useTransform(scrollY, [0, 100], ["1.5rem", "1.5rem"]);


  const skeletons = Array.from({ length: 6 }).map((_, i) => (
    <Card key={i} className="col-span-1 ">
      <CardContent className="p-4">
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  ));

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pt-4">
        <h1 className="text-4xl font-bold tracking-tight">Usuarios</h1>
        {isAdmin && (
          <Button onClick={() => setModalOpen(true)} className="gap-1.5 self-start sm:self-auto">
            <Plus className="size-4" />
            Nuevo Usuario
          </Button>
        )}
      </div>

      <div className="sticky top-0 z-30 py-4 -mx-4 px-4 backdrop-blur-md bg-background/60  border-2 rounded-2xl transition-colors duration-300">
        <motion.div
          style={{ maxWidth, borderRadius }}
          className="mx-auto w-full overflow-hidden shadow-lg border border-border"
        >
          <Card className="border-none rounded-none shadow-none">
            <CardContent className="flex flex-col md:flex-row gap-4 items-center p-4">
              <ToggleGroup
                type="single"
                variant="outline"
                value={filter}
                onValueChange={(value) => setFilter(value as FilterOption)}
                className="justify-start"
              >
                <ToggleGroupItem value="ALL" className="rounded-full">Todos</ToggleGroupItem>
                <ToggleGroupItem value="INACTIVE" className="rounded-full">Inactivos</ToggleGroupItem>
                <ToggleGroupItem value="ADMIN" className="rounded-full">Administradores</ToggleGroupItem>
              </ToggleGroup>

              <div className="flex-1 w-full">
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    placeholder="Buscar por nombre o email…"
                    onChange={(e) => setSearchText(e.target.value)}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-full auto-rows-fr px-4">
        <AnimatePresence mode="popLayout">
          {loading
            ? skeletons
            : users.map((user) => (
                <motion.div
                  key={user.id.value}
                  layout
                  className="h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <CustomUserCard user={user} />
                </motion.div>
              ))}
        </AnimatePresence>
      </div>
      {isAdmin && (
        <NewUserModal open={modalOpen} onOpenChange={setModalOpen} />
      )}
    </div>
  );
};

export default UserList;
