<template>
  <q-page class="q-pa-xl">

    <div class="row q-col-gutter-lg">

      <div
        v-for="company in companies"
        :key="company.id"
        class="col-12 col-sm-6 col-md-3 col-lg-2"
      >
        <q-card
          bordered
          class="q-pa-md flex-center column primary-background border-radius-md cursor-pointer hover-card"
          @click="onCardClick"
        >

          <q-avatar size="100px">
            <q-icon name="circle" size="100px" color="white" />
          </q-avatar>

          <div class="text-h6 text-center text-white text-weight-bold">
            {{ company.name }}
          </div>

          <div class="text-body2 q-mt-xs text-center text-white text-weight-bold">
            Доступных практик: {{ company.internships }}
          </div>

          <div class="text-body2 q-mt-xs text-center text-white text-weight-bold">
            Положение: {{ company.location }}
          </div>

        </q-card>
      </div>

    </div>

  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

type CompanyList = {
  id: number;
  name: string;
  internships: number;
  location: string;
};

const companies = reactive<CompanyList[]>([
  { id: 1, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
  { id: 2, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
  { id: 3, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
  { id: 4, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
  { id: 5, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
  { id: 6, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
  { id: 7, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
  { id: 8, name: 'ООО “Рожки да ножки”', internships: 3, location: 'Иркутск' },
]);

function onCardClick() {
    
}
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