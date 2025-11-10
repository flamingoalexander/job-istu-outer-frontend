<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md">
      <!-- Левая часть с фильтрами -->

      <div class="col-12 col-md-3">
        <div class="filter-card-wrapper">
          <q-card flat bordered class="filter-card q-pa-md">
            <div class="filter-title q-mb-lg">Фильтры</div>

            <!-- Компания -->
            <div class="q-mb-md">
              <label class="filter-label">Компания</label>
              <q-input
                filled
                dense
                v-model="filters.company"
                placeholder="Имя компании"
                class="input-blue"
                hide-bottom-space
              />
            </div>

            <!-- Специальности -->
            <div class="q-mb-md">
              <label class="filter-label">Специальности</label>
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
                class="select-blue"
                hide-bottom-space
              />
            </div>

            <!-- Навыки -->
            <div>
              <label class="filter-label">Навыки</label>
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
                class="select-blue"
                hide-bottom-space
              />
            </div>
          </q-card>
        </div>
      </div>

      <!-- Правая часть с карточками практик -->
      <div class="col-12 col-md-9">
        <div class="q-mb-md text-md-left">
          <q-btn
            label="Я сам нашел компанию"
            color="primary"
            text-color="white"
            unelevated
            class="btn-personal-internship"
          />
        </div>

        <div
          v-for="(internship, index) in filteredInternships"
          :key="'internship-' + index"
          class="q-mb-md"
        >
          <q-card flat bordered class="internship-card">
            <q-card-section>
              <div class="row q-col-gutter-md items-start text-white">
                <div class="col">
                  <div class="card-title">
                    {{ internship.title }}
                  </div>

                  <div class="card-line q-mt-xs">
                    <strong>Специальности: </strong>
                    <span class="card-text"> {{ internship.specialities.join(', ') }}</span>
                  </div>

                  <div class="card-line q-mt-xs row items-center no-wrap">
                    <strong class="q-mr-sm">Навыки:</strong>
                    <div class="row items-center q-gutter-xs wrap">
                      <q-chip
                        v-for="(skill, sindex) in internship.skills"
                        :key="sindex"
                        outline
                        text-color="white"
                        color="white"
                        class="q-mr-xs q-chip-skills"
                      >
                        {{ skill }}
                      </q-chip>
                    </div>
                  </div>
                </div>

                <div class="col-auto text-right">
                  <div class="row items-center justify-end no-wrap">
                    <div class="company-name q-mr-sm">
                      {{ internship.company }}
                    </div>
                    <q-avatar class="avatar-white">
                      <div class="avatar-picture"></div>
                    </q-avatar>
                  </div>

                  <div class="q-mt-sm justify-end">
                    <q-btn
                      label="Подробнее"
                      color="white"
                      text-color="#1976d2"
                      unelevated
                      class="btn-detailed"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface Internship {
  title: string;
  company: string;
  specialities: string[];
  skills: string[];
}

const filters = ref({
  company: '',
  specialities: [] as string[],
  skills: [] as string[],
});

const specialities = [
  { label: 'ИСиС', value: 'ИСиС' },
  { label: 'АСУ', value: 'АСУ' },
  { label: 'ЭВМБ', value: 'ЭВМБ' },
  { label: 'ИБС', value: 'ИБС' },
];

const skills = [
  { label: 'Python', value: 'Python' },
  { label: 'Fast API', value: 'Fast API' },
  { label: 'Веб-программирование', value: 'Веб-программирование' },
];

const internships = ref<Internship[]>([
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
  }
]);

const filteredInternships = computed(() =>
  internships.value.filter((internship) => {
    const matchCompany =
      !filters.value.company ||
      internship.company.toLowerCase().includes(filters.value.company.toLowerCase());

    const matchSpecialities =
      filters.value.specialities.length === 0 ||
      filters.value.specialities.some((sp) => internship.specialities.includes(sp));

    const matchSkills =
      filters.value.skills.length === 0 ||
      filters.value.skills.some((sk) => internship.skills.includes(sk));

    return matchCompany && matchSpecialities && matchSkills;
  }),
);
</script>

<style scoped>
/* Левая часть с фильтрами */
.filter-card-wrapper {
  position: sticky;
  top: 67px; /* расстояние от верха страницы */
}

.filter-card {
  background-color: #1976d2;
  border-radius: 10px;
  padding: 16px;
  color: #ffffff;
}

.filter-title {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 16px;
}

.filter-label {
  display: block;
  margin-bottom: 6px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
}

.input-blue ::v-deep(.q-field__control) {
  background-color: #ffffff !important;
  border-radius: 6px;
}

.input-blue ::v-deep(.q-field__native) {
  color: #1976d2 !important;
}

.input-blue ::v-deep(input::placeholder) {
  color: #1976d2 !important;
  opacity: 1;
}

.select-blue ::v-deep(.q-field__control) {
  background-color: #ffffff !important;
  border-radius: 6px;
}

.select-blue ::v-deep(.q-field__label) {
  color: #1976d2 !important;
}

.select-blue ::v-deep(.q-chip) {
  background-color: rgba(25, 118, 210, 0.1) !important;
  color: #1976d2 !important;
  border: 1px solid rgba(25, 118, 210, 0.3) !important;
}

/* Правая часть с карточками практик */
.internship-card {
  background-color: #1976d2;
  border-radius: 10px;
}

.card-title {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.2;
}

.card-text,
.card-line {
  font-size: 14px;
}

.company-name {
  font-size: 20px;
  font-weight: 600;
}

.avatar-white {
  background-color: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.avatar-picture {
  font-size: 14px;
}

.btn-detailed {
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  color: #1976d2;
}

.btn-personal-internship {
  font-weight: 600;
  border-radius: 8px;
  color: #1976d2;
}

.q-chip-skills {
  font-size: 14px;
  padding: 2px 10px;
}

/* Адаптация под мобильные устройства */
@media (max-width: 750px) {
  .card-title,
  .company-name {
    font-size: 12px;
  }
  .card-text,
  .card-line,
  .q-chip-skills,
  .btn-detailed {
    font-size: 10px;
  }
  .avatar-white {
    width: 20px;
    height: 20px;
  }
}
</style>
