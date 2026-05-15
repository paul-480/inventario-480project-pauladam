import { describe, expect, it } from "vitest"
import { Auth } from "./auth.entity"

describe('Auth', () => {
    it('should be unauthenticated by default', () => {
        const auth = new Auth()
        expect(auth.isAuthenticated()).toBe(false)
    })

    it('should return new auth instance when transitioning', () => {
        const auth = new Auth()
        const newAuth = auth.transition('LOGIN', { id: 'test-id', role: 'ROLE_EMPLOYEE' })
        expect(newAuth).not.toBe(auth)
    })

    it('should be authenticated after LOGIN transition', () => {
        const auth = new Auth()
        const newAuth = auth.transition('LOGIN', { id: 'test-id', role: 'ROLE_EMPLOYEE' })
        expect(newAuth.isAuthenticated()).toBe(true)
    })

    it('should return id after LOGIN', () => {
        const auth = new Auth()
        const newAuth = auth.transition('LOGIN', { id: 'user-42', role: 'ROLE_EMPLOYEE' })
        expect(newAuth.getId()).toBe('user-42')
    })

    it('should return null id when unauthenticated', () => {
        const auth = new Auth()
        expect(auth.getId()).toBeNull()
    })

    it('isAdmin() returns false for ROLE_EMPLOYEE', () => {
        const auth = new Auth()
        const newAuth = auth.transition('LOGIN', { id: 'test-id', role: 'ROLE_EMPLOYEE' })
        expect(newAuth.isAdmin()).toBe(false)
    })

    it('isAdmin() returns true for ROLE_ADMIN', () => {
        const auth = new Auth()
        const newAuth = auth.transition('LOGIN', { id: 'test-id', role: 'ROLE_ADMIN' })
        expect(newAuth.isAdmin()).toBe(true)
    })
})
