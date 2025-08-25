// import { acceptHMRUpdate, defineStore } from 'pinia';
// import axios from 'axios';
// import type { Practice } from 'src/types';
// import { StorageStatus } from 'stores/index';
// import ENDPOINTS from 'src/constants/endpoints';
// import { find } from 'lodash';
//
// export const useUserStorage = defineStore('user', {
//   state: () => ({
//     username: null as string | null,
//     first_name: null as string | null,
//     last_name: null as string | null,
//     email: null as string | null,
//     status: StorageStatus.Idle,
//   }),
//   actions: {
//     async fetch(force = false) {
//       if (this.status === StorageStatus.Success && !force) return;
//       if (this.status === StorageStatus.Pending) return;
//       this.status = StorageStatus.Pending;
//       try {
//         const { data } = await axios.get<Practice[]>(ENDPOINTS.practice.getAll());
//         this.items = data;
//         this.status = StorageStatus.Success;
//       } catch (e: unknown) {
//         this.status = StorageStatus.Error;
//         throw e;
//       }
//     },
//     async setInstId(id: number) {
//       this.inst_id = id;
//       await this.fetch(true);
//     },
//   },
// });
//
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(usePracticesStorage, import.meta.hot));
// }
