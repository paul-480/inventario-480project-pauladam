
import { DomainError } from '@/domain/shared/errors/domain.error';

export class TokenExpiredError extends DomainError {
  readonly code = 'TOKEN_EXPIRED';

  constructor() {
    super('Your session has expired, please log in again');
  }
}

