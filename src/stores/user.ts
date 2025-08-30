import { acceptHMRUpdate, defineStore } from 'pinia';
import type { Contact, Theme, UserCompany, UserPractice } from 'src/types';
import { ThemeTypes } from 'src/types';
import { StorageStatus } from 'stores/index';
import {
  associateThemeToPractice,
  createUserPractice,
  createUserTheme,
  deleteUserTheme,
  getUserPractice,
} from 'src/api/user';
import {
  getUserCompany,
  getUserInfo,
  login,
  logout,
  getUserThemes,
  getUserContacts,
  updateUserCompany,
  updateUserInfo,
} from 'src/api/user';
import type { Credentials } from 'src/types/auth';
import type { UserInfoBaseInput, UserCompanyBaseInput, UserThemeBaseInput } from 'src/api/user';
import { ACCESS_KEY } from 'src/api/token.service';
import { watch } from 'vue';
import { find } from 'lodash';

type UserState = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  company: UserCompany | null;
  themes: Theme[];
  contacts: Contact[];
  practices: UserPractice[];
  status: StorageStatus;
  isAuthenticated: boolean;
};

const IITIAD_FACULTY_ID = 38;

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    company: null,
    themes: [],
    contacts: [],
    practices: [],
    status: StorageStatus.Idle,
    isAuthenticated: !!(localStorage.getItem(ACCESS_KEY) || sessionStorage.getItem(ACCESS_KEY)),
  }),
  actions: {
    async login(credentials: Credentials): Promise<void> {
      if (this._isStoreBusy()) return;
      if (this.status === StorageStatus.Ready) return;
      this.status = StorageStatus.Pending;
      try {
        await login(credentials);
        this.isAuthenticated = true;
        this.status = StorageStatus.Ready;
      } catch (e) {
        this.status = StorageStatus.Idle;
        throw e;
      }
    },
    _isStoreBusy(): boolean {
      return this.status === StorageStatus.Pending;
    },
    initWatchers() {
      watch(
        () => this.isAuthenticated,
        async (isAuth) => {
          if (isAuth) {
            await this.fetch(true);
          } else {
            this.$reset();
          }
        },
        { immediate: true },
      );
    },
    async fetch(force = false): Promise<void> {
      if (this._isStoreBusy()) return;
      if (this.status === StorageStatus.Ready && !force) return;
      this.status = StorageStatus.Pending;
      const [info, company, themes, contacts, practices] = await Promise.all([
        getUserInfo(),
        getUserCompany(),
        getUserThemes(),
        getUserContacts(),
        getUserPractice(),
      ]);
      if (!find(practices, (pr) => pr.faculty === IITIAD_FACULTY_ID)) {
        const newPractice = await createUserPractice({ faculty: 38, company: company.id });
        this.practices.push(newPractice);
      }
      this.username = info.username;
      this.first_name = info.first_name;
      this.last_name = info.last_name;
      this.email = info.email;
      this.company = company;
      this.practices = practices;
      this.themes = themes;
      this.contacts = contacts;
      this.status = StorageStatus.Ready;
    },
    async logout() {
      if (this._isStoreBusy()) return;
      this.status = StorageStatus.Pending;
      try {
        await logout();
        this.$reset();
        this.isAuthenticated = false;
        this.status = StorageStatus.Idle;
      } catch (e) {
        this.status = StorageStatus.Ready;
        throw e;
      }
    },
    async updateUserInfo(payload: UserInfoBaseInput): Promise<void> {
      if (this._isStoreBusy()) return;
      this.status = StorageStatus.Pending;
      const userInfo = await updateUserInfo(payload);
      this.username = userInfo.username;
      this.first_name = userInfo.first_name;
      this.last_name = userInfo.last_name;
      this.email = userInfo.email;
      this.status = StorageStatus.Ready;
    },
    async updateUserCompany(payload: UserCompanyBaseInput): Promise<void> {
      if (this._isStoreBusy()) return;
      this.status = StorageStatus.Pending;
      this.company = await updateUserCompany(payload);
      this.status = StorageStatus.Ready;
    },
    async deleteTheme(themeId: number): Promise<void> {
      await deleteUserTheme(themeId);
      this.themes = await getUserThemes(); //TODO страшный костыль. Исправить это
    },
    async createTheme(theme: UserThemeBaseInput): Promise<void> {
      const newTheme = await createUserTheme(theme);
      await associateThemeToPractice(newTheme.id, this.iitiadPractice?.id);
      this.themes = await getUserThemes(); //TODO страшный костыль. Исправить это
    },
  },
  getters: {
    practiceThemes: (s): Theme[] => s.themes.filter((t) => t.type === ThemeTypes.PR),
    vkrThemes: (s): Theme[] => s.themes.filter((t) => t.type === ThemeTypes.VKR),
    niokrThemes: (s): Theme[] => s.themes.filter((t) => t.type === ThemeTypes.NIOKR),
    safeCompany: (s): UserCompany => {
      if (s.company === null) {
        throw new TypeError('Company is null');
      }
      return s.company;
    },
    iitiadPractice: (s): UserPractice => {
      const res = find(s.practices, (pr) => pr.faculty === IITIAD_FACULTY_ID);
      if (res) {
        return res;
      }
      throw new TypeError('iitiadPractice is null');
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
