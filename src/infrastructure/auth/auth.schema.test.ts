import { describe, it, expect } from "vitest"
import { loginSchema } from "./auth.schema"

describe('loginSchema', () => {
    it('should accept valid credentials', () => {
        const result = loginSchema.safeParse({
            email: 'user@test.com',
            password: 'password123'
        })
        expect(result.success).toBe(true)
    })

    it('should reject an invalid email', () => {
        const result = loginSchema.safeParse({
            email: 'no-es-email',
            password: 'password123'
        })
        expect(result.success).toBe(false)
        expect(result.error?.issues[0].message).toBe('Formato de email inválido')
    })

    it('should reject a password shorter than 8 characters', () => {
        const result = loginSchema.safeParse({
            email: 'user@test.com',
            password: '123'
        })
        expect(result.success).toBe(false)
        expect(result.error?.issues[0].message).toContain('8 caracteres')
    })

    it('should reject an empty email', () => {
        const result = loginSchema.safeParse({
            email: '',
            password: 'password123'
        })
        expect(result.success).toBe(false)
    })

    it('should reject an empty password', () => {
        const result = loginSchema.safeParse({
            email: 'user@test.com',
            password: ''
        })
        expect(result.success).toBe(false)
    })

    it('should reject missing fields', () => {
        const result = loginSchema.safeParse({})
        expect(result.success).toBe(false)
        expect(result.error?.issues.length).toBeGreaterThanOrEqual(2)
    })
})
