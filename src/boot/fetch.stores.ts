import { defineBoot } from '#q-app/wrappers';
import { useInstitutesStore } from 'stores/institutes';
import { useUserStore } from 'stores/user';
import { isUserAuthenticated } from 'src/api/token.service';

export default defineBoot(async () => {
  const institutesStore = useInstitutesStore();
  const userStore = useUserStore();
  try {
    await institutesStore.fetch();
    if (isUserAuthenticated()) {
      await userStore.fetch();
    }
  } catch (err) {
    console.error('Не удалось загрузить институты при старте', err);
  }
});
