import { describe, it, expect, vi, beforeEach } from "vitest"
import { handleAuthError } from "./authErrorHandler"
import { TokenExpiredError } from "@/domain/auth/errors/token-expired.error"
import { useAuthStore } from "./useAuthStore"

vi.mock('./useAuthStore', () => ({
    useAuthStore: {
        getState: vi.fn()
    }
}))

describe('handleAuthError', () => {
    const logoutMock = vi.fn()

    beforeEach(() => {
        vi.mocked(useAuthStore.getState).mockReturnValue({ logout: logoutMock } as any)
        logoutMock.mockClear()
    })

    it('should call logout when error is TokenExpiredError', () => {
        const error = new TokenExpiredError()
        handleAuthError(error)
        expect(logoutMock).toHaveBeenCalledOnce()
        expect(logoutMock).toHaveBeenCalledWith(error.message)
    })

    it('should not call logout for generic errors', () => {
        handleAuthError(new Error('some other error'))
        expect(logoutMock).not.toHaveBeenCalled()
    })

    it('should not call logout for non-error values', () => {
        handleAuthError(null)
        handleAuthError('string error')
        handleAuthError(undefined)
        expect(logoutMock).not.toHaveBeenCalled()
    })
})
