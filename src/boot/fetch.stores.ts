import { defineBoot } from '#q-app/wrappers';
import { useInstitutesStore } from 'stores/institutes';
import { useUserStore } from 'stores/user';
import { tokenStorage } from 'src/requests/token.storage';

export default defineBoot(async () => {
  const institutesStore = useInstitutesStore();
  const userStore = useUserStore();
  try {
    await institutesStore.fetch();
    if (tokenStorage.isAuthenticated()) {
      await userStore.fetch();
    }
  } catch (err) {
    console.error('Не удалось загрузить институты при старте', err);
  }
});
