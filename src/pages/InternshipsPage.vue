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
              :options="specialityOptions"
              multiple
              emit-value
              map-options
              use-chips
              label="Выберите специальности"
              label-color="primary"
              bg-color="white"
              hide-bottom-space
              :loading="specialitiesLoading"
            />
          </div>

          <div>
            <div class="text-subtitle2 q-mb-xs">Навыки</div>
            <q-select
              filled
              dense
              v-model="filters.skills"
              :options="skillOptions"
              multiple
              emit-value
              map-options
              use-chips
              label="Выберите навыки"
              label-color="primary"
              bg-color="white"
              hide-bottom-space
              :loading="skillsLoading"
            />
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-9">
        <div v-if="internshipsLoading" class="flex flex-center q-pa-xl">
          <q-spinner color="primary" size="3em" />
          <div class="q-ml-md">Загрузка практик...</div>
        </div>

        <div v-else-if="internshipsError" class="flex flex-center q-pa-xl">
          <q-banner class="bg-red-1 text-red q-pa-md rounded-borders">
            <div class="text-h6">Ошибка загрузки</div>
            <div>{{ String(internshipsError) }}</div>
          </q-banner>
        </div>

        <q-card
          v-for="internship in filteredInternships"
          :key="internship.id"
          flat
          class="q-mb-sm row items-center justify-between text-white primary-background border-radius-md"
        >
          <q-card-section class="col-12 col-md-8">
            <div class="text-h6 text-weight-bold">{{ internship.theme }}</div>

            <div class="q-mt-xs row flex-wrap q-gutter-xs">
              <div class="subtitle-1 text-weight-bold">Специальности:</div>
              <div class="q-mt-auto q-gutter-xs flex-wrap">
                <q-chip
                  v-for="speciality in getSpecialitiesNames(internship)"
                  :key="speciality"
                  outline
                  color="white"
                  dense
                >
                  {{ speciality }}
                </q-chip>
              </div>
            </div>

            <div class="q-mt-xs row items-center">
              <div class="q-mr-sm subtitle-1 text-weight-bold">Навыки:</div>
              <div class="q-mt-auto q-gutter-xs flex-wrap">
                <q-chip
                  v-for="skill in getSkillsNames(internship)"
                  :key="skill"
                  outline
                  color="white"
                  dense
                >
                  {{ skill }}
                </q-chip>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="col-12 col-md-3 text-right">
            <div class="row items-center justify-end q-gutter-xs">
              <div class="text-h6 text-weight-bold">{{ internship.company_name }}</div>
              <q-avatar size="40px" color="white"></q-avatar>
            </div>

            <div class="q-mt-sm">
              <q-btn
                label="Подробнее"
                color="white"
                text-color="primary"
                unelevated
                class="text-weight-bold"
                @click="goToDetail(internship.id)"
              />
            </div>
          </q-card-section>
        </q-card>

        <div
          v-if="!internshipsLoading && filteredInternships.length === 0"
          class="flex flex-center q-pa-xl"
        >
          <q-banner class="primary-background text-white q-pa-md rounded-borders">
            <div class="text-h6">Нет практик по выбранным фильтрам</div>
          </q-banner>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { getInternships } from 'src/api/internships';
import { getSkills } from 'src/api/skills';
import { getSpecialities } from 'src/api/specialities';
import type { Internship } from 'src/api/models/Internship';
import type { Skill } from 'src/api/models/Skill';
import type { Speciality } from 'src/api/models/Speciality';
import { filter, some, includes, toLower } from 'lodash';

const router = useRouter();

const filters = reactive({
  company: '',
  specialities: [] as number[],
  skills: [] as number[],
});

const {
  data: internships,
  isPending: internshipsLoading,
  error: internshipsError,
} = useQuery<Internship[]>({
  queryKey: ['internships'],
  queryFn: getInternships,
});

const { data: skillsData, isPending: skillsLoading } = useQuery<Skill[]>({
  queryKey: ['skills'],
  queryFn: getSkills,
});

const { data: specialitiesData, isPending: specialitiesLoading } = useQuery<Speciality[]>({
  queryKey: ['specialities'],
  queryFn: getSpecialities,
});

const skillOptions = computed(() => {
  return (
    skillsData.value?.map((skill) => ({
      label: skill.name,
      value: skill.id,
    })) || []
  );
});

const specialityOptions = computed(() => {
  return (
    specialitiesData.value?.map((spec) => ({
      label: `${spec.name} (${spec.code})`,
      value: spec.id,
    })) || []
  );
});

const getSpecialitiesNames = (internship: Internship): string[] => {
  const list = internship.specialities_list;
  if (Array.isArray(list)) {
    return list.map((s) => `${s.name} (${s.code})`);
  }
  return [];
};

const getSkillsNames = (internship: Internship): string[] => {
  const list = internship.skills_list;
  if (Array.isArray(list)) {
    return list.map((s) => s.name);
  }
  return [];
};

const getSpecialitiesIds = (internship: Internship): number[] => {
  const list = internship.specialities_list;
  if (Array.isArray(list)) {
    return list.map((s) => s.id);
  }
  return [];
};

const getSkillsIds = (internship: Internship): number[] => {
  const list = internship.skills_list;
  if (Array.isArray(list)) {
    return list.map((s) => s.id);
  }
  return [];
};

const filteredInternships = computed(() => {
  if (!internships.value) return [];

  return filter(internships.value, (internship: Internship) => {
    const matchCompany =
      !filters.company || includes(toLower(internship.company_name), toLower(filters.company));

    const internshipSpecialities = getSpecialitiesIds(internship);
    const matchSpecialities =
      filters.specialities.length === 0 ||
      some(filters.specialities, (sp: number) => includes(internshipSpecialities, sp));

    const internshipSkills = getSkillsIds(internship);
    const matchSkills =
      filters.skills.length === 0 ||
      some(filters.skills, (sk: number) => includes(internshipSkills, sk));

    return matchCompany && matchSpecialities && matchSkills;
  });
});

const goToDetail = (id: number) => {
  void router.push(`/practice/${id}`);
};
</script>
