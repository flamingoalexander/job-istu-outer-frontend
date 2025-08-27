import { acceptHMRUpdate, defineStore } from 'pinia';
import type { Company, Practice, Theme, Contact } from 'src/types';
import { StorageStatus } from 'stores/index';
import { getUserCompany, getUserInfo, login, logout } from 'src/api/user';
import type { Credentials } from 'src/types/auth';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null as string | null,
    first_name: null as string | null,
    last_name: null as string | null,
    email: null as string | null,
    company: null as Company | null,
    status: StorageStatus.Idle,
    themes: null as Theme[] | null,
    contacts: null as Contact[] | null,
    practices: null as Practice[] | null,
    isAuthenticated: false,
  }),
  actions: {
    async login(credentials: Credentials): Promise<void> {
      this.status = StorageStatus.Pending;
      await login(credentials);
      const userInfo = await getUserInfo();
      console.log(userInfo);
      this.username = userInfo.username;
      this.first_name = userInfo.first_name;
      this.last_name = userInfo.last_name;
      this.email = userInfo.email;
      const company = await getUserCompany();
      console.log(company);
      this.company = company;

    },
    async logout() {
      await logout();
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
