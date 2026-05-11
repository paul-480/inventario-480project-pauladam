export const USER_ROLES = ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] as const;
export type UserRoleValue = typeof USER_ROLES[number];

export class UserRole {
  readonly value: UserRoleValue;

  constructor(role: UserRoleValue) {
    this.value = role;
  }

  isAdmin(): boolean { return this.value === 'ROLE_ADMIN'; }
  toString(): UserRoleValue { return this.value; }
}