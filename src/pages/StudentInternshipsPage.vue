<template>
  <q-page class="q-pa-xl">
    <div class="text-h3 q-mb-lg text-weight-bold">Мои практики</div>

    <div class="text-h4 q-mb-sm">Текущая</div>

    <q-card class="q-mb-lg primary-background border-radius-md" flat bordered>
      <div class="row justify-between">
        <q-card-section class="col-12 col-md-8">
          <div class="text-h6 text-weight-bold text-white">
            {{ currentInternship.title }}
          </div>
          <div class="text-subtitle1 text-weight-bold q-mt-sm text-white">
            Тип практики: {{ currentInternship.type }}
          </div>
          <div class="text-subtitle1 text-weight-bold text-white">
            Дата: {{ currentInternship.dates?.start }} - {{ currentInternship.dates?.end }}
          </div>

          <div class="row items-center text-white">
            <q-checkbox
              v-model="currentInternship.status.approvedCompany"
              label="Одобрено компанией"
              color="primary"
              class="no-pointer-events"
            />
            <q-checkbox
              v-model="currentInternship.status.approvedTeacher"
              label="Одобрено преподавателем"
              color="primary"
              class="no-pointer-events"
            />
          </div>

          <div class="q-mt-xs">
            <div v-if="!currentInternship.status.approvedTeacher" class="row q-gutter-xs">
              <q-btn
                label="Загрузить индивидуальное задание"
                color="white"
                text-color="primary"
                unelevated
                class="text-weight-bold"
              />
              <q-btn
                label="Скачать шаблон индивидуального задания"
                color="white"
                text-color="primary"
                unelevated
                class="text-weight-bold"
              />
            </div>

            <div v-else class="row q-gutter-xs">
              <div v-if="currentInternship.status.grade === null" class="col-12">
                <q-input
                  v-model="currentInternship.status.reportUrl"
                  label="Ссылка на отчёт (Яндекс Диск)"
                  filled
                  dense
                  bg-color="white"
                  color="primary"
                  hide-bottom-space
                  label-color="primary"
                  style="max-width: 400px"
                  class="q-mb-sm"
                />
                <q-btn
                  color="white"
                  text-color="primary"
                  unelevated
                  class="text-weight-bold"
                  label="Отправить отчёт"
                />
              </div>

              <div v-else-if="currentInternship.status.grade <= 2" class="col-12">
                <div class="text-body1 q-mb-md text-white text-weight-bold">
                  Оценка за практику: {{ currentInternship.status.grade }}
                </div>
                <q-input
                  v-model="currentInternship.status.reportUrl"
                  label="Ссылка на отчёт (Яндекс Диск)"
                  filled
                  dense
                  bg-color="white"
                  color="primary"
                  hide-bottom-space
                  label-color="primary"
                  style="max-width: 400px"
                  class="q-mb-sm"
                />
                <q-btn
                  color="white"
                  text-color="primary"
                  unelevated
                  class="text-weight-bold"
                  label="Переотправить отчёт"
                />
              </div>

              <div v-else class="col-12">
                <div class="text-body1 q-mb-md text-white text-weight-bold">
                  Оценка за практику: {{ currentInternship.status.grade }}
                </div>
                <div class="row q-gutter-xs">
                  <q-btn
                    v-for="btn in [
                      'Загрузить индивидуальное задание',
                      'Загрузить характеристику',
                      'Загрузить дневник',
                      'Загрузить отчёт',
                    ]"
                    :key="btn"
                    color="white"
                    text-color="primary"
                    unelevated
                    class="text-weight-bold"
                    :label="btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-section class="col-12 col-md-3 text-right">
          <div class="row items-center justify-end q-gutter-sm">
            <div class="text-h6 text-weight-bold text-white">{{ currentInternship.company }}</div>
            <q-avatar size="40px" color="white"></q-avatar>
          </div>
          <div class="q-mt-sm">
            <div class="subtitle-1 text-weight-bold text-white">
              Преподаватель: {{ currentInternship.teacher }}
            </div>
          </div>
          <q-btn
            label="Чат"
            class="q-mt-md text-weight-bold"
            color="white"
            text-color="primary"
            unelevated
          />
        </q-card-section>
      </div>
    </q-card>

    <div class="text-h4 q-mb-sm">Прошлые</div>

    <q-card
      v-for="past in pastInternships"
      :key="past.id"
      flat
      bordered
      class="border-radius-md q-mb-sm primary-background text-white"
    >
      <div class="row justify-between">
        <q-card-section class="col-12 col-md-8">
          <div class="text-h6 text-weight-bold">{{ past.title }}</div>
          <div class="text-subtitle1 text-weight-bold q-mt-sm">Тип практики: {{ past.type }}</div>
          <div class="text-body1 text-weight-bold">Оценка за практику: {{ past.status.grade }}</div>
          <div class="text-subtitle1 text-weight-bold">
            Дата: {{ past.dates?.start }} - {{ past.dates?.end }}
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
            <div class="text-h6 text-weight-bold text-white">{{ past.company }}</div>
            <q-avatar size="40px" color="white"></q-avatar>
          </div>
          <div class="q-mt-sm">
            <div class="subtitle-1 text-weight-bold text-white">
              Преподаватель: {{ past.teacher }}
            </div>
          </div>
        </q-card-section>
      </div>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

type InternshipStatus = {
  approvedCompany: boolean;
  approvedTeacher: boolean;
  grade: number | null;
  reportUrl?: string;
};

type Internship = {
  id: number;
  title: string;
  company: string;
  image: string;
  type: string;
  teacher: string;
  specialities: string[];
  skills: string[];
  status: InternshipStatus;
  dates: {
    start: string;
    end: string;
  };
};

const currentInternship = reactive<Internship>({
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

const pastInternships = reactive<Internship[]>([
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
