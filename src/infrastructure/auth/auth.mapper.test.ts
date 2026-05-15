import { describe, it, expect } from "vitest"
import { authMapper } from "./auth.mapper"

describe('authMapper', () => {
    it('should decode a valid JWT token', () => {
        const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3Nzg3Njg1NDgsImV4cCI6MTc3ODc3MjE0OCwicm9sZXMiOlsiUk9MRV9BRE1JTiJdLCJ1c2VybmFtZSI6ImNhcmxvcy4wMDBAdGVjaGNvcnAuZXMiLCJuYW1lIjoiQ2FybG9zIiwiaWQiOiJjMjI5MjYwNS02NWNlLTRjOTMtYjRlYy01MDdkODlkYmI3ZDUiLCJyb2xlIjoiUk9MRV9BRE1JTiJ9.Fz01wbA6gf5gamJ0TP9rjHuo7CB1ch85B4Q6dVMDu_Zi2FDIJ6tQ9mIbC5-OcB8rABf6CtLsojOAIz9BQ0M8xp9GOVEKDuMe5Hv5bSLUCe6ZgFueHFiTOYWguEoht6i5QQ-zYEKpEMUDMtCQUAg3Y40coPagpy5V61K2oG1U4XFs2WkGlK3nSIgkE0X-M3a2hf1qIrQyUAadXaATfHt8HwL7bxN0AgqKIGUn_BheEyM_0_3bhxGxbU4mBkGk0-x3BlEc__JIvbzPKTQDRnsJ4-TZYcwvdo3IkcfI_f8kk-HdOVUPlMiw49afUV2Po5-jm4L7TMvmHNWaRqItlFIDZw'
        const decoded = authMapper.decodeToken(token)
        expect(decoded).toMatchObject({
            role: 'ROLE_ADMIN',
            username: 'carlos.000@techcorp.es',
            name: 'Carlos',
            id: 'c2292605-65ce-4c93-b4ec-507d89dbb7d5',
            exp: 1778772148,
            iat: 1778768548,
        })
    })
})