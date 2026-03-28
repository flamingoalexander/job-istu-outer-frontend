<template>
  <q-page padding>
    <div class="row justify-center">
      <div v-for="role in roles" :key="role" class="col-12 col-md-10 col-lg-9">
        <q-card flat bordered class="q-pa-lg">
          <q-card-section class="q-pa-none">
            <div class="text-h5 text-weight-bold">Рады Вас видеть, {{ firstName }},</div>

            <div class="text-body2 text-grey-7 q-mt-sm">
              в рабочем пространстве для контроля прохождения практик студентов, обработки заявок и
              отчётов!
            </div>

            <div class="text-subtitle1 text-weight-medium q-mt-lg">Перейдите к разделам:</div>
          </q-card-section>

          <q-card-section class="q-pa-none q-mt-md">
            <SectionButtons :role="role" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { storeToRefs } from 'pinia';
import SectionButtons from 'components/main-page/UserSectionsButtons.vue';

const { roles, firstName } = storeToRefs(useUserStore());
</script>
