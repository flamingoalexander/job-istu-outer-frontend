import { acceptHMRUpdate, defineStore } from 'pinia';
import type { UserRoles } from 'src/constants';
import { type Credentials } from 'src/api/models/Credentials';
import {
  login as loginApi,
  logout as logoutApi,
  loginEsia as loginEsiaApi,
  getMe,
} from 'src/api/auth';
import { map } from 'lodash';
type UserState = {
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  patronymic: string | null;
  roles: UserRoles[];
  isAuthenticated: boolean;
};

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: '',
    email: '',
    firstName: null,
    lastName: null,
    patronymic: null,
    roles: [],
    isAuthenticated: false,
  }),
  actions: {
    async _initAuth(): Promise<void> {
      try {
        await this.fetchMe();
        this.isAuthenticated = true;
      } catch {
        this.isAuthenticated = false;
      }
    },
    async login(credentials: Credentials): Promise<void> {
      await loginApi(credentials);
      await this.fetchMe();
      this.isAuthenticated = true;
    },
    async logout(): Promise<void> {
      await logoutApi();
      this.username = '';
      this.email = '';
      this.firstName = null;
      this.lastName = null;
      this.patronymic = null;
      this.roles = [];
      this.isAuthenticated = false;
    },
    loginEsia(): void {
      loginEsiaApi();
    },
    async fetchMe(): Promise<void> {
      const data = await getMe();
      this.username = data.username;
      this.email = data.email;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.patronymic = data.patronymic;
      this.roles = map(data.roles, (role) => role.name);
    },
  },
  getters: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
