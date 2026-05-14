import { DomainError } from "@/domain/shared/errors/domain.error";

export class InvalidUUIDerror extends DomainError {
  readonly code = 'INVALID_UUID';

  constructor() {
    super('UUID is not a valid UUID');
  }
}