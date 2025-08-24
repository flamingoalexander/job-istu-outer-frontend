import { defineStore, acceptHMRUpdate } from 'pinia';
import { type Institute } from 'src/types';
import axios from 'axios';
import ENDPOINTS from 'src/constants/endpoints';

export const useInstitutesStore = defineStore('institutes', {
  state: () => ({
    items: [] as Institute[],
    loading: false,
    loaded: false,
    error: null as string | null,
  }),

  getters: {
    isEmpty: (s) => s.items.length === 0,
    getById: (s) => (id: number | string) =>
      s.items.find((i) => String(i.id) === String(id)) || null,
  },

  actions: {
    async fetchAll(force = false) {
      if (this.loaded && !force) return;
      if (this.loading) return;
      this.loading = true;
      this.error = null;
      try {
        const { data } = await axios.get<Institute[]>(ENDPOINTS.faculty.getAll());
        this.items = data;
        this.loaded = true;
      } catch (e: unknown) {
        if (e instanceof Error) {
          this.error = e?.message ?? 'Failed to load institutes';
        }
        throw e;
      } finally {
        this.loading = false;
      }
    },

    async getIdsAndNames(force = false) {
      await this.fetchAll(force);
      return this.items.map((i) => ({ id: i.id, name: i.name }));
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useInstitutesStore, import.meta.hot));
}
