<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'stores/user';
import { storeToRefs } from 'pinia';
import type { UserInfoBaseInput } from 'src/api/user';
import UserInfoForm from 'components/profile/forms/UserInfoForm.vue';
import { StorageStatus } from 'stores';

const userInfoFormVisible = ref(false);

const userStore = useUserStore();

const { username, email, first_name, last_name, status } = storeToRefs(userStore);
const applyPatch = async (payload: UserInfoBaseInput): Promise<void> => {
  await userStore.updateUserInfo(payload);
};
</script>

<template>
  <q-inner-loading :showing="status === StorageStatus.Pending">
    <q-spinner-gears size="30px" color="primary" />
  </q-inner-loading>
  <template v-if="status === StorageStatus.Ready">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Личный кабинет предприятия</div>
      <q-btn
        round
        color="primary"
        icon="edit"
        aria-label="Редактировать пользователя"
        @click="userInfoFormVisible = true"
      />
    </div>

    <div class="row q-col-gutter-lg q-mb-lg">
      <div class="col-12 col-md-6">
        <div class="q-mb-md">
          <div class="text-caption text-grey-7 q-mb-xs">Логин</div>
          <div class="bg-grey-3 q-pa-sm q-rounded-sm">
            {{ username || 'Данные не заданы' }}
          </div>
        </div>
        <div>
          <div class="text-caption text-grey-7 q-mb-xs">Контакты</div>
          <div class="bg-grey-3 q-pa-sm q-rounded-sm">
            {{ email || 'Данные не заданы' }}
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="q-mб-md">
          <div class="text-caption text-grey-7 q-mb-xs">Имя</div>
          <div class="bg-grey-3 q-pa-sm q-rounded-sm">
            {{ first_name || 'Данные не заданы' }}
          </div>
        </div>
        <div>
          <div class="text-caption text-grey-7 q-mb-xs">Фамилия</div>
          <div class="bg-grey-3 q-pa-sm q-rounded-sm">
            {{ last_name || 'Данные не заданы' }}
          </div>
        </div>
      </div>
    </div>
  </template>
  <UserInfoForm
    :userInfoFormVisible="userInfoFormVisible"
    :initial="{
      first_name,
      last_name,
      email,
    }"
    @update:userInfoFormVisible="(val) => (userInfoFormVisible = val)"
    @confirm="applyPatch"
  />
</template>

<style scoped></style>
