import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';
import { defineBoot } from '#q-app/wrappers';
// import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
export default defineBoot(({ app }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
      },
    },
  });

  app.use(VueQueryPlugin, {
    queryClient,
  });
  // if (process.env.DEV) {
  //   app.use(VueQueryDevtools, {
  //     initialIsOpen: true,
  //   })
  // }
});
