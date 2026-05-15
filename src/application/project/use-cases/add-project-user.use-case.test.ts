import { describe, it, expect, vi, beforeEach } from "vitest"
import { AddProjectUserUseCase } from "./add-project-user.use-case"
import { mockProjectUserRepo, mockProjectUser } from "../__mocks__/project.repository.mock"
import type { AddProjectUserSchema } from "@/infrastructure/projectUser/projectUser.repository"

const input: AddProjectUserSchema = {
    app_user_id: 'user-uuid-1',
    project_role_id: 'role-uuid-1',
}

describe('AddProjectUserUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call addProjectUser with projectId and user input', async () => {
        vi.mocked(mockProjectUserRepo.addProjectUser).mockResolvedValueOnce(mockProjectUser)
        await AddProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)
        expect(mockProjectUserRepo.addProjectUser).toHaveBeenCalledWith('project-uuid-1', input)
    })

    it('should return the added project user', async () => {
        vi.mocked(mockProjectUserRepo.addProjectUser).mockResolvedValueOnce(mockProjectUser)
        const result = await AddProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)
        expect(result).toEqual(mockProjectUser)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockProjectUserRepo.addProjectUser).mockResolvedValueOnce(null)
        const result = await AddProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockProjectUserRepo.addProjectUser).mockRejectedValueOnce(new Error('DB error'))
        await expect(AddProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)).rejects.toThrow('DB error')
    })
})
