<template>
  <q-page class="q-pa-xl">
    <div class="text-h3 q-mb-lg text-weight-bold">Мои практики</div>

    <template v-if="currentInternship">
      <div class="text-h4 q-mb-sm text-weight-bold">Текущая</div>
      <CurrentInternship v-model:internship="currentInternship" />
    </template>

    <template v-else>
      <q-banner class="primary-background q-pa-md q-my-md rounded-borders">
        <div class="text-h5 text-weight-bold text-white text-center">
          Сейчас у вас нет активной практики
        </div>
        <div class="text-subtitle1 text-weight-bold text-white text-center">
          Как только вы договоритесь с компанией, тут появится активная практика
        </div>
      </q-banner>
    </template>

    <template v-if="previousInternships && previousInternships.length">
      <div class="text-h4 q-mb-sm text-weight-bold">Прошлые</div>
      <PreviousInternship v-for="item in previousInternships" :key="item.id" :internship="item" />
    </template>

    <template v-else>
      <q-banner class="primary-background q-pa-md q-my-md rounded-borders">
        <div class="text-h5 text-weight-bold text-white text-center">
          Сейчас у вас нет прошлых практик
        </div>
      </q-banner>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import CurrentInternship from 'src/components/student/CurrentInternship.vue';
import PreviousInternship from 'src/components/student/PreviousInternship.vue';
import type { StudentInternship } from 'src/types';

const currentInternship = reactive<StudentInternship>({
  id: 1,
  title: 'Разработка микросервиса на FastAPI',
  company: 'Рога и Копыта',
  image: '',
  type: 'Производственная',
  teacher: 'Аношко Алексей Федорович',
  specialities: ['ИСИб', 'АСУб'],
  skills: ['Python', 'FastAPI', 'PostgreSQL'],
  status: {
    approvedCompany: true,
    approvedTeacher: false,
    grade: null,
    reportUrl: '',
  },
  dates: {
    start: '20.07.2024',
    end: '04.08.2024',
  },
});

const previousInternships = reactive<StudentInternship[]>([
  {
    id: 2,
    title: 'Учебная практика',
    company: 'Рога и Копыта',
    image: '',
    type: 'Учебная',
    teacher: 'Аношко Алексей Федорович',
    specialities: [],
    skills: [],
    status: {
      approvedCompany: true,
      approvedTeacher: true,
      grade: 5,
    },
    dates: {
      start: '20.07.2023',
      end: '04.08.2023',
    },
  },
  {
    id: 3,
    title: 'Разработка личного кабинета',
    company: 'Рога и Копыта',
    image: '',
    type: 'Учебная',
    teacher: 'Аношко Алексей Федорович',
    specialities: [],
    skills: [],
    status: {
      approvedCompany: true,
      approvedTeacher: true,
      grade: 5,
    },
    dates: {
      start: '20.07.2023',
      end: '04.08.2023',
    },
  },
]);
</script>

<style scoped></style>
