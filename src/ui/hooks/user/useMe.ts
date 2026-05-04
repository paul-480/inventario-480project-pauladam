import { GetMyUserUseCase } from "@/application/user/use-cases/get-my-user.use-case";
import type { DomainError } from "@/domain/shared/errors/domain.error";
import { useEffect, useState } from "react";
import { UserApiRepository } from "@/infrastructure/api/user/user.api.repository";
import type { User } from "@/domain/user/user.entity";


const GetMyUser = GetMyUserUseCase(UserApiRepository)

export const useMe = () => {
    const [me, setMe] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<DomainError | null>(null);
    useEffect(()=>{
        GetMyUser.then((user)=>{
            setMe(user);
            setLoading(false);
        }).catch((error)=>{
            setError(error);
            setLoading(false);
        })
    }, [])
    return {me, loading, error}
}
