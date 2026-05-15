import { vi } from "vitest"
import type { SectorRepository } from "@/infrastructure/sector/sector.repository"
import type { Sector } from "@/domain/sector/sector.entity"

export const mockSectorRepo: SectorRepository = {
    getSectorById: vi.fn(),
    getSectors: vi.fn(),
    createSector: vi.fn(),
    updateSector: vi.fn(),
    deleteSector: vi.fn(),
}

export const mockSector: Sector = {
    id: { value: 'sector-uuid-1' },
    name: 'Technology',
}
