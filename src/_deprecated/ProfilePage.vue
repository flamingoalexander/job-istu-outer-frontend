<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { useRouter } from 'vue-router';
import UserInfo from 'components/profile/UserInfo.vue';
import UserCompany from 'components/profile/UserCompany.vue';
import UserThemes from 'components/profile/UserThemes.vue';
import { StorageStatus } from 'stores';

const userStore = useUserStore();

const router = useRouter();

const logout = async () => {
  await userStore.logout();
  await router.push('auth');
};
</script>
<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row justify-center">
      <div class="col-12 col-lg-10 col-xl-8">
        <q-inner-loading v-if="userStore.status !== StorageStatus.Ready">
          <q-spinner-gears size="30px" color="primary" />
        </q-inner-loading>
        <q-card v-else flat bordered class="q-pa-lg q-rounded-xl relative-position">
          <UserInfo />
          <q-separator spaced />
          <UserCompany />
          <q-separator spaced />
          <UserThemes />
          <q-btn color="red" aria-label="Выйти" label="Выйти" @click="logout" />
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<style scoped></style>
