<template>
  <q-card flat bordered class="border-radius-md q-mb-sm primary-background text-white">
    <div class="row justify-between">
      <q-card-section class="col-12 col-md-8">
        <div class="text-h6 text-weight-bold">{{ internship.title }}</div>
        <div class="text-subtitle1 text-weight-bold q-mt-sm">
          Тип практики: {{ internship.type }}
        </div>
        <div class="text-body1 text-weight-bold">
          Оценка за практику: {{ internship.status.grade }}
        </div>
        <div class="text-subtitle1 text-weight-bold">
          Дата: {{ internship.dates?.start }} - {{ internship.dates?.end }}
        </div>

        <div class="row q-gutter-xs q-mt-sm">
          <q-btn
            v-for="btn in [
              'Скачать индивидуальное задание',
              'Скачать характеристику',
              'Скачать дневник',
              'Скачать отчёт',
            ]"
            :key="btn"
            color="white"
            text-color="primary"
            unelevated
            class="text-weight-bold"
            :label="btn"
          />
        </div>
      </q-card-section>

      <q-card-section class="col-12 col-md-3 text-right">
        <div class="row items-center justify-end q-gutter-sm">
          <div class="text-h6 text-weight-bold">{{ internship.company }}</div>
          <q-avatar size="40px" color="white"></q-avatar>
        </div>
        <div class="q-mt-sm">
          <div class="subtitle-1 text-weight-bold">Преподаватель: {{ internship.teacher }}</div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import type { StudentInternship } from 'src/types';

defineProps<{
  internship: StudentInternship;
}>();
</script>
