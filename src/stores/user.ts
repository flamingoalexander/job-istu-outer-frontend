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
import type { Credentials } from 'src/types';
import type { UserInfoBaseInput, UserCompanyBaseInput, UserThemeBaseInput } from 'src/api/user';
import { ACCESS_KEY } from 'src/api/token.service';
import { watch } from 'vue';
import { find, filter } from 'lodash';

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
    //TODO неплохо было бы иметь разделенный статус для полей стора loading: { user: boolean, company: boolean, themes: boolean, practices: boolean },
    // либо вынести поля стора в отдельные хранилища - themeStore, companyStore и т.д. но тогда возможно будет проблема с организацией параллельного фетча этих хранилищ. Тут надо подумать
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
      const [company, practices] = await Promise.all([
        getUserCompany().then((company) => {
          this.company = company;
          return company;
        }),
        getUserPractice().then((practices) => {
          this.practices = practices;
          return practices;
        }),
        getUserInfo().then((info) => {
          //TODO довести до ума. Сейчас это не имеет смысла т.к. статус загрузки единый и компонент все равно будет ждать пока все не загрузится
          this.username = info.username;
          this.first_name = info.first_name;
          this.last_name = info.last_name;
          this.email = info.email;
          //В теории должно быть что-то вроде this.loading.info = false
          return info;
        }),
        getUserThemes().then((themes) => {
          this.themes = themes;
          return themes;
        }),
        getUserContacts().then((contacts) => {
          this.contacts = contacts;
          return contacts;
        }),
      ]);
      if (!find(practices, (pr) => pr.faculty === IITIAD_FACULTY_ID)) {
        //TODO кринж. Надо это убирать
        const newPractice = await createUserPractice({ faculty: 38, company: company.id });
        this.practices.push(newPractice);
      }
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
      this.themes = await getUserThemes(); //TODO страшный костыль. Исправить это.
    },
    async createTheme(theme: UserThemeBaseInput): Promise<void> {
      //TODO страшный костыль. Исправить это.
      const newTheme = await createUserTheme(theme);
      await associateThemeToPractice(newTheme.id, this.iitiadPractice?.id);
      this.themes = await getUserThemes();
    },
  },
  getters: {
    practiceThemes: (s): Theme[] => filter(s.themes, (t) => t.type === ThemeTypes.PR),

    vkrThemes: (s): Theme[] => filter(s.themes, (t) => t.type === ThemeTypes.VKR),

    niokrThemes: (s): Theme[] => filter(s.themes, (t) => t.type === ThemeTypes.NIOKR),

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
