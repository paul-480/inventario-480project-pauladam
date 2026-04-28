export const tokenService = {
  save: (token: string) => localStorage.setItem('auth_token', token),
  get: () => localStorage.getItem('auth_token'),
  remove: () => localStorage.removeItem('auth_token'),
};