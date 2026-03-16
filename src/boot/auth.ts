import { defineBoot } from '#q-app/wrappers';
import { useUserStore } from 'src/stores/user';

export default defineBoot(async () => {
  const userStore = useUserStore();
  await userStore._initAuth();
});
