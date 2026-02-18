import { acceptHMRUpdate, defineStore } from 'pinia';
import { UserRoles } from 'src/constants';
import { type Credentials } from 'src/api/models/Credentials';
import { login as loginApi, logout as logoutApi } from 'src/api/auth';
type UserState = {
  role: UserRoles | null;
  isAuthenticated: boolean;
};

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    role: null,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials: Credentials): Promise<void> {
      const { role } = await loginApi(credentials);
      this.role = role;
      this.isAuthenticated = true;
    },
    async logout(): Promise<void> {
      await logoutApi();
      this.role = null;
      this.isAuthenticated = false;
    },
  },
  getters: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
