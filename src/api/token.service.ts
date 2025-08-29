type StorageKind = 'local' | 'session';

const ACCESS_KEY = 'access_token';
const REMEMBER_KEY = 'remember_me';

function storage(kind: StorageKind): Storage {
  return kind === 'local' ? localStorage : sessionStorage;
}

export function setAccessToken(access: string, rememberMe: boolean): void {
  localStorage.setItem(REMEMBER_KEY, rememberMe ? '1' : '0');
  const s = rememberMe ? storage('local') : storage('session');
  s.setItem(ACCESS_KEY, access);
  (rememberMe ? storage('session') : storage('local')).removeItem(ACCESS_KEY);
}

export function updateAccessToken(access: string): void {
  const rememberMe = localStorage.getItem(REMEMBER_KEY) === '1';
  const s = rememberMe ? storage('local') : storage('session');
  s.setItem(ACCESS_KEY, access);
  (rememberMe ? storage('session') : storage('local')).removeItem(ACCESS_KEY);
}

export function getAccessToken(): string | null {
  const rememberMe = localStorage.getItem(REMEMBER_KEY) === '1';
  const s = rememberMe ? storage('local') : storage('session');
  return s.getItem(ACCESS_KEY);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REMEMBER_KEY);
}

export function isUserAuthenticated(): boolean {
  const rememberMe = localStorage.getItem(REMEMBER_KEY) === '1';
  const s = rememberMe ? storage('local') : storage('session');
  return !!s.getItem(ACCESS_KEY);
}

export function isRemembered(): boolean {
  return localStorage.getItem(REMEMBER_KEY) === '1';
}
