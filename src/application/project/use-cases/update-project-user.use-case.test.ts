import { describe, it, expect, vi, beforeEach } from "vitest"
import { UpdateProjectUserUseCase } from "./update-project-user.use-case"
import { mockProjectUserRepo, mockProjectUser } from "../__mocks__/project.repository.mock"
import type { AddProjectUserSchema } from "@/infrastructure/projectUser/projectUser.repository"

const input: AddProjectUserSchema = {
    app_user_id: 'user-uuid-1',
    project_role_id: 'role-uuid-2',
}

describe('UpdateProjectUserUseCase', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should call updateProjectUsers with projectId and user input', async () => {
        vi.mocked(mockProjectUserRepo.updateProjectUsers).mockResolvedValueOnce(mockProjectUser)
        await UpdateProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)
        expect(mockProjectUserRepo.updateProjectUsers).toHaveBeenCalledWith('project-uuid-1', input)
    })

    it('should return the updated project user', async () => {
        vi.mocked(mockProjectUserRepo.updateProjectUsers).mockResolvedValueOnce(mockProjectUser)
        const result = await UpdateProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)
        expect(result).toEqual(mockProjectUser)
    })

    it('should return null when repository returns null', async () => {
        vi.mocked(mockProjectUserRepo.updateProjectUsers).mockResolvedValueOnce(null)
        const result = await UpdateProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)
        expect(result).toBeNull()
    })

    it('should propagate errors from the repository', async () => {
        vi.mocked(mockProjectUserRepo.updateProjectUsers).mockRejectedValueOnce(new Error('DB error'))
        await expect(UpdateProjectUserUseCase(mockProjectUserRepo, 'project-uuid-1', input)).rejects.toThrow('DB error')
    })
})
