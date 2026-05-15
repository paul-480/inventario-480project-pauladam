import { vi } from "vitest"
import type { TechnologyRepository } from "@/infrastructure/technology/technology.repository"
import type { Technology } from "@/domain/technology/technology.entity"

export const mockTechnologyRepo: TechnologyRepository = {
    getTechnologyById: vi.fn(),
    getTechnologies: vi.fn(),
    createTechnology: vi.fn(),
    updateTechnology: vi.fn(),
    deleteTechnology: vi.fn(),
}

export const mockTechnology: Technology = {
    id: { value: 'tech-uuid-1' },
    name: 'React',
}
