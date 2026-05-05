import { GetMyUserUseCase } from "@/application/user/use-cases/get-my-user.use-case";
import { useEffect, useState } from "react";
import { UserApiRepository } from "@/infrastructure/api/user/user.api.repository";
import  { type User } from "@/domain/user/user.entity";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/application/auth/useAuth";

export const useMe = () => {
    const {handleAuthError} = useAuth();
    const [me, setMe] = useState<User>({name: ""} as User);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        GetMyUserUseCase(UserApiRepository)
        .then(user => {
            console.log("Usuario obtenido:", {user});
            setMe(user);
            setLoading(false);
        }).catch(err => {handleAuthError(err)})
       
    }, [navigate])
    return {me, loading}
}
