import { defineBoot } from '#q-app/wrappers';
import { useInstitutesStore } from 'stores/institutes';
import { Loading } from 'quasar';

export default defineBoot(async () => {
  const institutesStore = useInstitutesStore();
  Loading.show();
  try {
    await institutesStore.fetch();
  } catch (err) {
    console.error('Не удалось загрузить институты при старте', err);
    throw err;
  }
  Loading.hide();
});
