type StorageKind = 'local' | 'session';

const ACCESS_KEY = 'access_token';
const REMEMBER_KEY = 'remember_me';

function storage(kind: StorageKind): Storage {
  return kind === 'local' ? localStorage : sessionStorage;
}

export const tokenStorage = {
  set(access: string, rememberMe: boolean) {
    localStorage.setItem(REMEMBER_KEY, rememberMe ? '1' : '0');
    const s = rememberMe ? storage('local') : storage('session');
    s.setItem(ACCESS_KEY, access);
    (rememberMe ? storage('session') : storage('local')).removeItem(ACCESS_KEY);
  },
  refresh(access: string) {
    const rememberMe = localStorage.getItem(REMEMBER_KEY) === '1';
    const s = rememberMe ? storage('local') : storage('session');
    s.setItem(ACCESS_KEY, access);
    (rememberMe ? storage('session') : storage('local')).removeItem(ACCESS_KEY);
  },

  get(): string | null {
    const remember = localStorage.getItem(REMEMBER_KEY) === '1';
    const s = remember ? storage('local') : storage('session');
    return s.getItem(ACCESS_KEY);
  },

  clear() {
    localStorage.removeItem(ACCESS_KEY);
    sessionStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REMEMBER_KEY);
  },

  isRemembered(): boolean {
    return localStorage.getItem(REMEMBER_KEY) === '1';
  },
};
