import { acceptHMRUpdate, defineStore } from 'pinia';
import type { Practice } from 'src/types';
import { StorageStatus } from 'stores/index';
import ENDPOINTS from 'src/constants/endpoints';
import { find } from 'lodash';
import { publicHttpClient } from 'src/api/http.clients';

export const usePracticesStore = defineStore('practices', {
  state: () => ({
    items: [] as Practice[],
    inst_id: null as null | number,
    status: StorageStatus.Idle,
  }),
  getters: {
    isEmpty: (state): boolean => state.items.length === 0,
    getById:
      (state) =>
      (id: number | string): Practice | null =>
        find(state.items, (i) => String(i.id) === String(id)) || null,
    getInstId: (state): number | null => state.inst_id,
  },
  actions: {
    async fetch(force = false) {
      if (this.status === StorageStatus.Success && !force) return;
      if (this.status === StorageStatus.Pending) return;
      this.status = StorageStatus.Pending;
      try {
        const { data } = await publicHttpClient.get<Practice[]>(ENDPOINTS.practice.getAll());
        this.items = data;
        this.status = StorageStatus.Success;
      } catch (e: unknown) {
        this.status = StorageStatus.Error;
        throw e;
      }
    },
    async setInstId(id: number) {
      this.inst_id = id;
      await this.fetch(true);
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePracticesStore, import.meta.hot));
}
