<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-3">
        <q-card flat bordered class="q-pa-md text-white primary-background border-radius-md">
          <div class="q-mb-sm text-h6 text-weight-bold">Фильтры</div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-xs">Компания</div>
            <q-input
              filled
              dense
              v-model="filters.company"
              bg-color="white"
              color="primary"
              hide-bottom-space
              label="Имя компании"
              label-color="primary"
            />
          </div>

          <div class="q-mb-md">
            <div class="text-subtitle2 q-mb-xs">Специальности</div>
            <q-select
              filled
              dense
              v-model="filters.specialities"
              :options="specialities"
              multiple
              emit-value
              map-options
              use-chips
              label="Выберите специальности"
              label-color="primary"
              bg-color="white"
              hide-bottom-space
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs">Навыки</div>
            <q-select
              filled
              dense
              v-model="filters.skills"
              :options="skills"
              multiple
              emit-value
              map-options
              use-chips
              label="Выберите навыки"
              label-color="primary"
              bg-color="white"
              hide-bottom-space
            />
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-9">
        <div class="q-mb-sm">
          <q-btn
            label="Я сам нашел компанию"
            color="primary"
            text-color="white"
            unelevated
            class="q-pa-sm text-weight-bold border-radius-md"
          />
        </div>

        <q-card
          v-for="internship in filteredInternships"
          :key="internship.title"
          flat
          class="q-mb-sm row items-center justify-between text-white primary-background border-radius-md"
        >
          <q-card-section class="col-12 col-md-8">
            <div class="text-h6 text-weight-bold">{{ internship.title }}</div>
            <div class="q-mt-xs row flex-wrap q-gutter-xs">
              <div class="subtitle-1 text-weight-bold">Специальности:</div>
              <span>{{ internship.specialities.join(', ') }}</span>
            </div>

            <div class="q-mt-xs row items-center">
              <div class="q-mr-sm subtitle-1 text-weight-bold">Навыки:</div>
              <div class="q-mt-auto q-gutter-xs flex-wrap">
                <q-chip v-for="skill in internship.skills" :key="skill" outline color="white" dense>
                  {{ skill }}
                </q-chip>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="col-12 col-md-3 text-right">
            <div class="row items-center justify-end q-gutter-xs">
              <div class="text-h6 text-weight-bold">{{ internship.company }}</div>
              <q-avatar size="40px" color="white"></q-avatar>
            </div>

            <div class="q-mt-sm">
              <q-btn
                label="Подробнее"
                color="white"
                text-color="primary"
                unelevated
                class="text-weight-bold"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { filter, some, includes, toLower } from 'lodash';

const filters = reactive({
  company: '',
  specialities: [] as string[],
  skills: [] as string[],
});

const specialities = reactive([
  { label: 'ИСиС', value: 'ИСиС' },
  { label: 'АСУ', value: 'АСУ' },
  { label: 'ЭВМБ', value: 'ЭВМБ' },
  { label: 'ИБС', value: 'ИБС' },
]);

const skills = reactive([
  { label: 'Python', value: 'Python' },
  { label: 'Fast API', value: 'Fast API' },
  { label: 'Веб-программирование', value: 'Веб-программирование' },
]);

const internships = reactive([
  {
    title: 'Разработка микросервиса на Fast API',
    company: 'Какая-то компания',
    specialities: ['ИСиС', 'АСУ', 'ЭВМБ', 'ИБС'],
    skills: ['Fast API', 'Python', 'Веб-программирование'],
  },
  {
    title: 'Разработка микросервиса на Fast API',
    company: 'ООО “Рога и копыта”',
    specialities: ['ИСиС', 'АСУ', 'ЭВМБ', 'ИБС'],
    skills: ['Fast API', 'Веб-программирование'],
  },
  {
    title: 'Разработка микросервиса на Fast API',
    company: 'ООО “Рога и копыта”',
    specialities: ['ИСиС', 'АСУ', 'ЭВМБ'],
    skills: ['Fast API', 'Python', 'Веб-программирование'],
  },
]);

const filteredInternships = computed(() => {
  return filter(internships, (internship) => {
    const matchCompany =
      !filters.company || includes(toLower(internship.company), toLower(filters.company));

    const matchSpecialities =
      filters.specialities.length === 0 ||
      some(filters.specialities, (sp: string) => includes(internship.specialities, sp));

    const matchSkills =
      filters.skills.length === 0 ||
      some(filters.skills, (sk: string) => includes(internship.skills, sk));

    return matchCompany && matchSpecialities && matchSkills;
  });
});
</script>

<style scoped></style>
