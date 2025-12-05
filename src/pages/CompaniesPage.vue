<template>
  <q-page class="q-pa-xl">
    <span v-if="isPending">Loading...</span>
    <span v-else-if="isError">Error: {{ error?.message }}</span>
    <div class="row q-col-gutter-lg" v-else>
      <div v-for="company in companies" :key="company.id" class="col-12 col-sm-6 col-md-3 col-lg-2">
        <q-card
          bordered
          class="q-pa-md flex-center column primary-background border-radius-md cursor-pointer hover-card"
        >
          <q-avatar size="100px">
            <q-icon name="circle" size="100px" color="white" :datasrc="company.image_url" />
          </q-avatar>

          <div class="text-h6 text-center text-white text-weight-bold">
            {{ company.name }}
          </div>

          <div class="text-body2 q-mt-xs text-center text-white text-weight-bold">
            Доступных практик: {{ 0 }}
          </div>

          <div class="text-body2 q-mt-xs text-center text-white text-weight-bold">
            Деятельность: {{ company.area_of_activity }}
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getCompanies } from 'src/api/companies';
import { type Company } from 'src/api';

const { isPending, isError, data: companies, error } = useQuery<Company[]>({
  queryKey: ['companies'],
  queryFn: getCompanies,
});
</script>

<style>
.hover-card {
  transition: all 0.2s ease;
}

.hover-card:hover {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
