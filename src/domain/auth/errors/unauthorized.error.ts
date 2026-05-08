import { DomainError } from "@/domain/shared/errors/domain.error";

export class UnauthorizedError extends DomainError {
  readonly code = 'UNAUTHORIZED';

  constructor() {
    super('You are not authorized to perform this action');
  }
}