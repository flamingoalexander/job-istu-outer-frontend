<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import CompanyInfoForm from 'components/profile/forms/CompanyInfoForm.vue';
import type { UserCompanyBaseInput } from 'src/api/user';
import { StorageStatus } from 'stores';
const userStore = useUserStore();

const userCompanyFormVisible = ref(false);

const { status, safeCompany } = storeToRefs(userStore);
const applyPatch = async (payload: UserCompanyBaseInput) => {
  await userStore.updateUserCompany(payload);
};
</script>

<template>
  <q-inner-loading :showing="status === StorageStatus.Pending">
    <q-spinner-gears size="30px" color="primary" />
  </q-inner-loading>
  <template v-if="status === StorageStatus.Ready">
    <div class="q-mb-lg">
      <div class="row items-center justify-between q-mb-md">
        <div class="text-h6">Информация о компании</div>
        <q-btn
          round
          color="primary"
          icon="edit"
          aria-label="Редактировать компанию"
          @click="userCompanyFormVisible = true"
        />
      </div>

      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-4">
          <div class="text-caption text-grey-7 q-mb-xs">Лого компании</div>
          <q-img :src="safeCompany.image_url" class="q-rounded-md" />
        </div>
        <div class="col-12 col-md-8">
          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">Название компании</div>
            <div class="bg-grey-3 q-pa-sm q-rounded-sm">
              {{ safeCompany.name || 'Данные не заданы' }}
            </div>
          </div>
          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">Направление деятельности</div>
            <div class="bg-grey-3 q-pa-sm q-rounded-sm">
              {{ safeCompany.area_of_activity || 'Данные не заданы' }}
            </div>
          </div>
          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">ФИО главы компании</div>
            <div class="bg-grey-3 q-pa-sm q-rounded-sm">
              {{ safeCompany.head_full_name || 'Данные не заданы' }}
            </div>
          </div>
          <div class="q-mb-md">
            <div class="text-caption text-grey-7 q-mb-xs">Договор</div>
            <div class="bg-grey-3 q-pa-sm q-rounded-sm">
              {{ safeCompany.agreement || 'Данные не заданы' }}
            </div>
          </div>
          <div>
            <div class="text-caption text-grey-7 q-mb-xs">Количество студентов</div>
            <div class="bg-grey-3 q-pa-sm q-rounded-sm">
              {{ safeCompany.hire_count ?? 0 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <CompanyInfoForm
      :userCompanyFormVisible="userCompanyFormVisible"
      :initial="safeCompany"
      @update:userCompanyFormVisible="(val) => (userCompanyFormVisible = val)"
      @confirm="applyPatch"
    />
  </template>
</template>

<style scoped></style>
