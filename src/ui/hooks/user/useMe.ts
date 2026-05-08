import { GetMyUserUseCase } from "@/application/user/use-cases/get-my-user.use-case";
import { useEffect, useState } from "react";
import { UserApiRepository } from "@/infrastructure/api/user/user.api.repository";
import  { type User } from "@/domain/user/user.entity";

export const useMe = () => {
    const [me, setMe] = useState<User>({name: ""} as User);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        GetMyUserUseCase(UserApiRepository)
        .then(user => {
            console.log("Usuario obtenido:", {user});
            setMe(user);
            setLoading(false);
        }).catch(console.error)
       
    }, [])
    return {me, loading}
}
