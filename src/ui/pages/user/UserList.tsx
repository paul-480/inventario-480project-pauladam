
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardTitle } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { Input } from "@/ui/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/ui/components/ui/toggle-group";
import CustomUserCard from "@/ui/components/user/CustomUserCard";
import { useUsers, type FilterOption } from "@/ui/hooks/user/useUsers";
import { SearchIcon } from "lucide-react";

const UserList = () => {
  const { filteredUsers: users, loading, filter, setFilter } = useUsers();

  const skeletons = Array.from({ length: 6 }).map((_, i) => (
    <Card key={i} className="col-span-1 ">
      <CardContent className="p-4">
        <Skeleton className="h-24 w-full" />
      </CardContent>
    </Card>
  ));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full auto-rows-fr">
      <h1>Usuarios</h1>
      <Card className="col-span-2 ">
        <CardTitle>
          <h2>Filtrar Usuarios</h2>
        </CardTitle>
        <CardContent className="flex gap-2 items-center">
          <ToggleGroup type="single" value={filter} onValueChange={(value) => setFilter(value as FilterOption)}>
            <ToggleGroupItem value="ALL">Todos</ToggleGroupItem>
            <ToggleGroupItem value="INACTIVE">Inactivos</ToggleGroupItem>
            <ToggleGroupItem value="ADMIN">Administradores</ToggleGroupItem>
          </ToggleGroup>
          <Input placeholder="Buscar…" />
          <Button variant="outline" size="icon">
            <SearchIcon />
          </Button>
        </CardContent>
      </Card>
      {loading ? skeletons : users.map(user => (
        <CustomUserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
