import { acceptHMRUpdate, defineStore } from 'pinia';
import type { Contact, Practice, Theme, UserCompany } from 'src/types';
import { ThemeTypes } from 'src/types';
import { StorageStatus } from 'stores/index';
import type { UserCompanyBaseInput } from 'src/api/user';
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
import type { UserInfoBaseInput } from 'src/api/user';

type UserState = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  company: UserCompany | null;
  themes: Theme[];
  contacts: Contact[];
  practices: Practice[];
  status: StorageStatus;
};

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

  }),
  actions: {
    async login(credentials: Credentials): Promise<void> {
      if (this._isStoreBusy()) return;
      if (this.status === StorageStatus.Ready) return;
      this.status = StorageStatus.Pending;
      await login(credentials);
      await this.fetch(true);
    },
    _isStoreBusy(): boolean {
      return this.status === StorageStatus.Pending;
    },
    async fetch(force = false): Promise<void> {
      if (this._isStoreBusy()) return;
      if (this.status === StorageStatus.Ready && !force) return;
      const [info, company, themes, contacts] = await Promise.all([
        getUserInfo(),
        getUserCompany(),
        getUserThemes(),
        getUserContacts(),
      ]);
      this.username = info.username;
      this.first_name = info.first_name;
      this.last_name = info.last_name;
      this.email = info.email;
      this.company = company;
      this.themes = themes;
      this.contacts = contacts;
      this.status = StorageStatus.Ready;
    },
    async logout() {
      if (this._isStoreBusy()) return;
      this.status = StorageStatus.Pending;
      await logout();
      this.$reset();
      this.status = StorageStatus.Idle;
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
  },
  getters: {
    practiceThemes: (s): Theme[] => s.themes.filter((t) => t.type === ThemeTypes.PR),
    vkrThemes: (s): Theme[] => s.themes.filter((t) => t.type === ThemeTypes.VKR),
    niokrThemes: (s): Theme[] => s.themes.filter((t) => t.type === ThemeTypes.NIOKR),
    getSafeCompany: (s): UserCompany => {
      if (s.company === null){
        throw new TypeError("Company is null")
      }
      return s.company
    },

}});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
