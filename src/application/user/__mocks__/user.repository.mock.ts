import { vi } from "vitest"
import type { UserRepository } from "@/infrastructure/user/user.repository"
import type { User } from "@/domain/user/user.entity"
import { UserRole } from "@/domain/shared/user-role.vo"

export const mockUserRepo: UserRepository = {
    getUserById: vi.fn(),
    getUsers: vi.fn(),
    getUsersByProjectId: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
    changePassword: vi.fn(),
    adminChangePassword: vi.fn(),
}

export const mockUser: User = {
    id: { value: 'user-uuid-1' },
    name: 'Juan',
    surname: 'García',
    email: 'juan@test.com',
    isActive: true,
    role: new UserRole('ROLE_EMPLOYEE'),
}
