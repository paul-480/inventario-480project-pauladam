import { DomainError } from '@/domain/shared/errors/domain.error';

export class UserNotFoundError extends DomainError {
    readonly code = 'USER_NOT_FOUND';

    constructor(id: string) {
        super(`User with id "${id}" was not found`);
    }
}