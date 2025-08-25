import { defineBoot } from '#q-app/wrappers';
import { useInstitutesStore } from 'stores/institutes';
export default defineBoot(async () => {
  const institutesStore = useInstitutesStore();
  try {
    await institutesStore.fetch();
  } catch (err) {
    console.error('Не удалось загрузить институты при старте', err);
  }
});
