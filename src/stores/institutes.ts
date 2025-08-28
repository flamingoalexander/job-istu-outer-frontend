import { defineStore, acceptHMRUpdate } from 'pinia';
import { type Institute } from 'src/types';
import ENDPOINTS from 'src/constants/endpoints';
import { StorageStatus } from 'stores/index';
import { find } from 'lodash';
import { publicHttpClient } from 'src/requests/http.clients';

export const useInstitutesStore = defineStore('institutes', {
  state: () => ({
    items: [] as Institute[],
    status: StorageStatus.Idle,
  }),

  getters: {
    isEmpty: (state): boolean => state.items.length === 0,
    getById:
      (state) =>
      (id: number | string): Institute | null =>
        find(state.items, (i) => String(i.id) === String(id)) || null,
  },

  actions: {
    async fetch(force = false) {
      if (this.status === StorageStatus.Ready && !force) return;
      if (this.status === StorageStatus.Pending) return;
      this.status = StorageStatus.Pending;
      try {
        const { data } = await publicHttpClient.get<Institute[]>(ENDPOINTS.faculty.getAll());
        this.items = data;
        this.status = StorageStatus.Ready;
      } catch (e: unknown) {
        this.status = StorageStatus.Error;
        throw e;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInstitutesStore, import.meta.hot));
}
