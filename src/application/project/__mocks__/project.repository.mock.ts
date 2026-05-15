import { vi } from "vitest"
import type { ProjectRepository } from "@/infrastructure/project/project.repository"
import type { Project } from "@/domain/project/project.entity"
import { Uuid } from "@/domain/shared/uuid.vo"
import type { DevelopmentRepository } from "@/infrastructure/development/development.repository"
import type { Development } from "@/domain/development/development.entity"
import type { ProjectUserRepository } from "@/infrastructure/projectUser/projectUser.repository"
import type { ProjectUser } from "@/domain/projectUser/projectUser.entity"
import type { TimeEntryRepository } from "@/infrastructure/timeEntry/timeEntry.repository"
import type { TimeEntry, ProjectTimeEntry } from "@/domain/timeEntry/timeEntry.entity"

export const mockProjectRepo: ProjectRepository = {
    getProjectById: vi.fn(),
    getProjects: vi.fn(),
    getProjectsByUserId: vi.fn(),
    createProject: vi.fn(),
    updateProject: vi.fn(),
    softDeleteProject: vi.fn(),
    deleteProject: vi.fn(),
}

export const mockDevelopmentRepo: DevelopmentRepository = {
    getProjectDevelopments: vi.fn(),
    createProjectDevelopment: vi.fn(),
    updateProjectDevelopment: vi.fn(),
    deleteProjectDevelopment: vi.fn(),
}

export const mockProjectUserRepo: ProjectUserRepository = {
    getProjectUsers: vi.fn(),
    addProjectUser: vi.fn(),
    updateProjectUsers: vi.fn(),
    deactivateProjectUser: vi.fn(),
}

export const mockTimeEntryRepo: TimeEntryRepository = {
    getUserTimeEntries: vi.fn(),
    createTimeEntry: vi.fn(),
    getProjectTimeEntries: vi.fn(),
    updateProjectTimeEntry: vi.fn(),
    deleteProjectTimeEntry: vi.fn(),
}

export const mockProject: Project = {
    id: new Uuid('00000000-0000-0000-0000-000000000001'),
    name: 'Test Project',
    description: 'A test project',
    startDate: '2024-01-01',
    isActive: true,
    client: { id: new Uuid('00000000-0000-0000-0000-000000000002'), name: 'TechCorp' },
}

export const mockDevelopment: Development = {
    id: { value: 'dev-uuid-1' },
    name: 'Frontend',
    description: 'React frontend',
    technology: { id: { value: 'tech-uuid-1' }, name: 'React' },
    urlRepository: 'https://github.com/org/repo',
    links: [],
}

export const mockProjectUser: ProjectUser = {
    appUserId: { value: 'user-uuid-1' },
    name: 'Juan',
    surname: 'García',
    isUserActive: true,
    role: { id: { value: 'role-uuid-1' }, name: 'Developer' },
}

export const mockTimeEntry: TimeEntry = {
    id: { value: 'entry-uuid-1' },
    date: '2024-06-01',
    hour: 8,
    comment: 'Worked on feature X',
    project: { id: { value: 'project-uuid-1' }, name: 'Test Project' },
}

export const mockProjectTimeEntry: ProjectTimeEntry = {
    id: { value: 'entry-uuid-1' },
    name: 'Juan',
    surname: 'García',
    date: '2024-06-01',
    hour: 8,
    comment: 'Worked on feature X',
}
