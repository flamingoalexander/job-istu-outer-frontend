<script setup lang="ts">
import { ref } from 'vue';
import UserInfoForm from 'src/components/UserInfoForm.vue';
import { useUserStore } from 'stores/user';
import { storeToRefs } from 'pinia';
import type { UserInfoBaseInput } from '../requests';

const userStore = useUserStore();
const { company, username, first_name, last_name, email } = storeToRefs(userStore);

const userInfoFormVisible = ref(false);
const userCompanyFormVisible = ref(false);

const applyUserInfoPatch = async (payload: UserInfoBaseInput) => {
  await userStore.updateUserInfo(payload);
};

// const applyUserCompanyPatch = async (payload: UserCompanyBaseInput) => {
//   await userStore.updateUserCompany(payload);
// };
</script>

<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row justify-center">
      <div class="col-12 col-lg-10 col-xl-8">
        <q-card flat bordered class="q-pa-lg q-rounded-xl">
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
                <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ email || 'Данные не заданы' }}</div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="q-mb-md">
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

          <q-separator spaced />

          <!-- Компания -->
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
                <q-img :src="company?.image_url" class="q-rounded-md" />
              </div>
              <div class="col-12 col-md-8">
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">Название компании</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">
                    {{ company?.name || 'Данные не заданы' }}
                  </div>
                </div>
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">Направление деятельности</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">
                    {{ company?.area_of_activity || 'Данные не заданы' }}
                  </div>
                </div>
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">ФИО главы компании</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">
                    {{ company?.head_full_name || 'Данные не заданы' }}
                  </div>
                </div>
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">Договор</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">
                    {{ company?.agreement || 'Данные не заданы' }}
                  </div>
                </div>
                <div>
                  <div class="text-caption text-grey-7 q-mb-xs">Количество студентов</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ company?.hire_count ?? 0 }}</div>
                </div>
              </div>
            </div>
          </div>
          <q-separator spaced />
        </q-card>
      </div>
    </div>

    <UserInfoForm
      :userInfoFormVisible="userInfoFormVisible"
      :initial="{
        first_name,
        last_name,
        email,
      }"
      @update:userInfoFormVisible="(val) => (userInfoFormVisible = val)"
      @confirm="applyUserInfoPatch"
    />

    <!--    <CompanyInfoForm-->
    <!--      :userCompanyFormVisible="userCompanyFormVisible"-->
    <!--      :initial="company"-->
    <!--      @update:userCompanyFormVisible="val => userCompanyFormVisible = val"-->
    <!--      @confirm="applyUserCompanyPatch"-->
    <!--    />-->
  </q-page>
</template>

<style scoped></style>
