import { defineBoot } from '#q-app/wrappers';
import { Notify } from 'quasar';

export default defineBoot(() => {
  const errorHandler = (event: ErrorEvent): void => {
    Notify.create({
      type: 'negative',
      message: event.message || 'Неизвестная ошибка',
      position: 'top',
      timeout: 5000,
      multiLine: true,
      actions: [{ label: 'Закрыть', color: 'white' }],
    });
  };
  const promiseErrorHandler = (event: PromiseRejectionEvent): void => {
    const { reason } = event;
    Notify.create({
      type: 'negative',
      message: reason.message || 'Неизвестная ошибка',
      position: 'top',
      timeout: 5000,
      multiLine: true,
      actions: [{ label: 'Закрыть', color: 'white' }],
    });
  };
  window.addEventListener('unhandledrejection', promiseErrorHandler);
  window.addEventListener('error', errorHandler);
});
