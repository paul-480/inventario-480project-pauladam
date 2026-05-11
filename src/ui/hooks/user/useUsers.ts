
import { useEffect, useState } from "react";
import { UserApiRepository } from "@/infrastructure/api/user/user.api.repository";
import { isAdmin, type User } from "@/domain/user/user.entity";
import { GetUserByIdUseCase } from "@/application/user/use-cases/get-user-by-id.use-case";
import { getAllUsersUseCase } from "@/application/user/use-cases/get-all-users.use-case";

// Filter options
export type FilterOption = "ALL" | "INACTIVE" | "ADMIN";

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    // filter state
    const [filter, setFilter] = useState<FilterOption>("ALL");
    const [searchText, setSearchText] = useState("");
    const getUserById = async (id: string) => {
        const user = await GetUserByIdUseCase(UserApiRepository, id);
        return user;
    };

    // initial fetch
    useEffect(() => {
        getAllUsersUseCase(UserApiRepository)
            .then((users) => {
                setUsers(users);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching all users:", err);
                setUsers([]);
                setLoading(false);
            });
    }, []);

    // apply filter whenever users or filter changes
    useEffect(() => {
        let result = [...users];

        if (searchText.trim().length > 0) {
            const term = searchText.trim().toLowerCase();
            result = result.filter((u) =>
                u.name.toLowerCase().includes(term) ||
                u.surname.toLowerCase().includes(term) ||
                u.email.toLowerCase().includes(term)
            );
        }

        if (filter === "INACTIVE") {
            result = result.filter((u) => !u.isActive);
        } else if (filter === "ADMIN") {
            result = result.filter((u) => isAdmin(u));
        }
        setFilteredUsers(result);
    }, [users, filter, searchText]);

    return { filteredUsers, loading, getUserById, filter, setFilter, setSearchText };
};
