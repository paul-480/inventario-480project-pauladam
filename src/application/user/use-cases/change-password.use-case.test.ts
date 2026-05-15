import { describe, it, expect, vi, beforeEach } from "vitest"
import { ChangePasswordUseCase, AdminChangePasswordUseCase } from "./change-password.use-case"
import { mockUserRepo } from "../__mocks__/user.repository.mock"
import type { ChangePasswordSchema, AdminChangePasswordSchema } from "@/infrastructure/user/user.schema"

const changePayload: ChangePasswordSchema = {
    id: '00000000-0000-0000-0000-000000000001',
    current_password: 'oldpass123',
    new_password: 'newpass456',
}

const adminPayload: AdminChangePasswordSchema = {
    id: '00000000-0000-0000-0000-000000000001',
    new_password: 'newpass456',
}

describe('ChangePasswordUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call changePassword on the repository', async () => {
        vi.mocked(mockUserRepo.changePassword).mockResolvedValueOnce(undefined)
        await ChangePasswordUseCase(mockUserRepo, changePayload)
        expect(mockUserRepo.changePassword).toHaveBeenCalledOnce()
        expect(mockUserRepo.changePassword).toHaveBeenCalledWith(changePayload)
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockUserRepo.changePassword).mockRejectedValueOnce(new Error('Wrong password'))
        await expect(ChangePasswordUseCase(mockUserRepo, changePayload)).rejects.toThrow('Wrong password')
    })
})

describe('AdminChangePasswordUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call adminChangePassword on the repository', async () => {
        vi.mocked(mockUserRepo.adminChangePassword).mockResolvedValueOnce(undefined)
        await AdminChangePasswordUseCase(mockUserRepo, adminPayload)
        expect(mockUserRepo.adminChangePassword).toHaveBeenCalledOnce()
        expect(mockUserRepo.adminChangePassword).toHaveBeenCalledWith(adminPayload)
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockUserRepo.adminChangePassword).mockRejectedValueOnce(new Error('Forbidden'))
        await expect(AdminChangePasswordUseCase(mockUserRepo, adminPayload)).rejects.toThrow('Forbidden')
    })
})
