import { Auth } from "@/domain/auth/auth.entity";
import { renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useAuthStore } from "./useAuthStore";
import { useAuth } from "./useAuth";

vi.mock('./useAuthStore', () => ({
    useAuthStore: vi.fn()
}))

const mockStore = (auth: Auth) =>
    vi.mocked(useAuthStore).mockReturnValue({
        auth,
        login: vi.fn(),
        logout: vi.fn(),
        checkAuth: vi.fn(),
        clearError: vi.fn(),
        errorMessage: null,
        send: vi.fn(),
    })

const mockStoreOnce = (auth: Auth) =>
    vi.mocked(useAuthStore).mockReturnValueOnce({
        auth,
        login: vi.fn(),
        logout: vi.fn(),
        checkAuth: vi.fn(),
        clearError: vi.fn(),
        errorMessage: null,
        send: vi.fn(),
    })

describe('useAuth', () => {

    beforeEach(() => {
        mockStore(new Auth())
    })

    it('should return isAuthenticated false by default', () => {
        const { result } = renderHook(() => useAuth())
        expect(result.current.isAuthenticated).toBe(false)
    })

    it('should return isAuthenticated true when auth is authenticated', () => {
        mockStoreOnce(new Auth().transition('LOGIN', { id: 'user-1', role: 'ROLE_EMPLOYEE' }))
        const { result } = renderHook(() => useAuth())
        expect(result.current.isAuthenticated).toBe(true)
    })

    it('should return isAdmin true when role is ROLE_ADMIN', () => {
        mockStoreOnce(new Auth().transition('LOGIN', { id: 'admin-1', role: 'ROLE_ADMIN' }))
        const { result } = renderHook(() => useAuth())
        expect(result.current.isAdmin).toBe(true)
    })

    it('should return isError true when auth is in error state', () => {
        const errorAuth = new Auth().transition('REQUEST_AUTH').transition('AUTH_ERROR')
        mockStoreOnce(errorAuth)
        const { result } = renderHook(() => useAuth())
        expect(result.current.isError).toBe(true)
    })

    it('should return isLoading true when auth is loading', () => {
        mockStoreOnce(new Auth().transition('REQUEST_AUTH'))
        const { result } = renderHook(() => useAuth())
        expect(result.current.isLoading).toBe(true)
    })

    it('should call login with credentials and reject on error', async () => {
        const loginMock = vi.fn().mockRejectedValueOnce(new Error('Invalid credentials'))
        vi.mocked(useAuthStore).mockReturnValueOnce({
            auth: new Auth(),
            login: loginMock,
            logout: vi.fn(),
            checkAuth: vi.fn(),
            clearError: vi.fn(),
            errorMessage: null,
            send: vi.fn(),
        })
        const { result } = renderHook(() => useAuth())
        await expect(result.current.login('bad@test.com', 'wrong')).rejects.toThrow('Invalid credentials')
        expect(loginMock).toHaveBeenCalledWith('bad@test.com', 'wrong')


    })
})