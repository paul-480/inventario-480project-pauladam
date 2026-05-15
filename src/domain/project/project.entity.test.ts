import { describe, it, expect } from 'vitest'
import { displayProjectStartDate } from './project.entity'

describe('displayProjectStartDate', () => {
    it('should return "Sin fecha" when startDate is null', () => {
        const project = { startDate: null }
        expect(displayProjectStartDate(project)).toBe('Sin fecha')
    })

    it('should return "Sin fecha" when startDate is empty string', () => {
        const project = { startDate: '' }
        expect(displayProjectStartDate(project)).toBe('Sin fecha')
    })

    it('should return formatted date when startDate is valid', () => {
        const project = { startDate: '2025-10-20' }
        expect(displayProjectStartDate(project)).toBe('20 oct 2025')
    })

    it('formatea correctamente una fecha ISO válida', () => {
        const result = displayProjectStartDate({ startDate: '2024-01-15' })
        expect(result).toContain('2024')
        expect(result).toContain('ene')
        expect(result).toContain('15')
    })
})
