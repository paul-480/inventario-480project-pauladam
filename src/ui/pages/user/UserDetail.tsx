import type { User } from "@/domain/user/user.entity";
import MainProfileCard from "@/ui/components/user/MainProfileCard";
import { useUsers } from "@/ui/hooks/user/useUsers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const UserDetail = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User | null>(null);
    const { getUserById } = useUsers();

    useEffect(() => {
        if (id) {
          getUserById(id).then(user => {
            setUser(user);
          });
        }
    }, [id])

    return (
        <div>
            {user && <MainProfileCard  {...user} ></MainProfileCard>}
        </div>
    )
}

export default UserDetail
