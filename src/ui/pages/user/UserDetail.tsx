import type { User } from "@/domain/user/user.entity";
import { isAdmin } from "@/domain/user/user.entity";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/components/ui/card";
import { Skeleton } from "@/ui/components/ui/skeleton";
import CustomAvatar from "@/ui/components/user/CustomAvatar";
import { useMe } from "@/ui/hooks/user/useMe";
import { useUsers } from "@/ui/hooks/user/useUsers";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModifyUserForm from "@/ui/components/forms/ModifyUserForm";

const UserDetail = ({ paramUser }: { paramUser: User | null }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const { getUserById } = useUsers();
    const { me } = useMe();

    useEffect(() => {
        if (paramUser) {
            setUser(paramUser);
            return;
        }
        if (!id) return;
        getUserById(id).then((fetchedUser) => {
            setUser(fetchedUser);
        });
    }, [id, paramUser, getUserById]);

    if (!user) {
        return (
            <div className="p-4 md:p-8 max-w-5xl mx-auto">
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    const isOwnProfile = me?.id === user.id;
    const canEdit = !!me && (isAdmin(me) || isOwnProfile);
    const backPath = isOwnProfile ? "/" : "/users";

    return (
        <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate(backPath)}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-bold">
                        {isOwnProfile ? "Mi Perfil" : "Detalle de Personal"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isOwnProfile ? "Tu informacion personal" : "Informacion completa del empleado"}
                    </p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between gap-3">
                        <CardTitle>Informacion Personal</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row gap-6">
                        <CustomAvatar user={user} className="w-24 h-24" />
                        <div className="flex-1">
                            <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 ">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h2 className={`text-2xl font-bold ${!user.isActive ? "opacity-70" : ""}`}>
                                        {user.name} {user.surname}
                                    </h2>
                                    {isOwnProfile && (
                                        <Badge className="bg-primary/10 text-secondary dark:bg-primary/20 dark:text-secondary border-0">
                                            Tu
                                        </Badge>
                                    )}
                                    {isAdmin(user) && !!me && isAdmin(me) && (
                                        <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 border-0">
                                            Administrador
                                        </Badge>
                                    )}
                                </div>
                                <div className={`gap-4 ${!user.isActive ? "opacity-70" : ""}`}>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Correo Corporativo</p>
                                        <p className="font-medium">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                            {canEdit && <ModifyUserForm user={user} />}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserDetail


