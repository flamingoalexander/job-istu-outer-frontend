<template>
  <q-page class="q-pa-md">
    <div v-if="repPending" class="text-center q-pa-lg">
      <q-spinner-dots color="primary" size="3em" />
      <div class="q-mt-sm text-grey-7">Загрузка данных...</div>
    </div>

    <div v-else class="row q-col-gutter-md justify-center">
      <div class="col-12 col-md-7">
        <q-card
          v-if="company"
          flat
          class="q-mb-sm row justify-between text-white primary-background border-radius-md"
        >
          <q-card-section class="col-12 col-md-8">
            <div class="text-h4 text-weight-bold">
              {{ company.name }}
              <q-btn icon="edit" size="sm" flat dense round color="white" @click="openCompanyForm">
                <q-tooltip>Редактировать профиль</q-tooltip>
              </q-btn>
            </div>
            <div class="text-body2">{{ company.area_of_activity }}</div>
            <div v-if="company.head_full_name" class="q-mt-md text-caption">
              <div class="text-body2">Руководитель: {{ company.head_full_name }}</div>
              <div class="text-body2">Должность: {{ company.head_job_title }}</div>
            </div>
          </q-card-section>
          <q-card-section class="col-12 col-md-3 text-right">
            <q-avatar size="120px" color="white">
              <img v-if="company.image_url" :src="company.image_url" :alt="company.name" />
              <q-icon v-else name="business" size="60px" color="grey-5" />
            </q-avatar>
          </q-card-section>
        </q-card>

        <div class="text-h3 q-mb-md text-weight-bold">Мои практики</div>

        <q-btn
          label="Добавить практику"
          color="primary"
          unelevated
          class="q-mb-lg text-weight-bold"
          @click="openPracticeForm"
        />

        <div v-if="internshipsPending" class="text-center q-pa-md">
          <q-spinner-hourglass color="primary" size="2em" />
          <div class="q-mt-xs text-grey-7">Загрузка практик...</div>
        </div>

        <q-card
          v-else-if="internships?.length"
          v-for="internship in internships"
          :key="internship.id"
          flat
          class="q-mb-sm row items-center justify-between text-white primary-background border-radius-md"
        >
          <q-card-section class="col-12 col-md-8">
            <div class="text-h6 text-weight-bold">{{ internship.theme }}</div>
            <div v-if="internship.description">
              {{ internship.description }}
            </div>
            <div v-if="internship.hire_count">Количество мест: {{ internship.hire_count }}</div>
            <div class="row flex-wrap q-gutter-xs">
              <div class="subtitle-1 text-weight-bold">Специальности:</div>
              <span>{{ internship.specialities_list?.map((s) => s.name).join(', ') }}</span>
            </div>

            <div class="row">
              <div class="q-mr-sm subtitle-1 text-weight-bold">Навыки:</div>
              <div class="q-gutter-xs flex-wrap">
                <q-chip
                  v-for="skill in internship.skills_list"
                  :key="skill.id"
                  outline
                  color="white"
                  dense
                >
                  {{ skill.name }}
                </q-chip>
              </div>
            </div>
          </q-card-section>
          <q-card-section class="col-12 col-md-3 text-right">
            <div class="text-subtitle1">{{ internship.company_name }}</div>
            <div class="q-mt-sm">
              <q-btn
                label="Подробнее"
                color="white"
                text-color="primary"
                unelevated
                class="text-weight-bold q-mt-lg"
              />
            </div>
          </q-card-section>
        </q-card>

        <q-banner v-else-if="internships?.length === 0" rounded class="bg-primary text-white">
          У компании пока нет добавленных практик.
        </q-banner>
      </div>
    </div>
    <CompanyProfileForm
      v-if="company"
      :form-visible="companyFormVisible"
      :initial="company"
      @update:form-visible="companyFormVisible = $event"
      @confirm="handleCompanyUpdate"
    />
    <PracticeForm
      :form-visible="practiceFormVisible"
      @update:form-visible="practiceFormVisible = $event"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import CompanyProfileForm from 'src/components/forms/CompanyProfileForm.vue';
import PracticeForm from 'components/forms/PracticeForm.vue';
import { getMyCompanyRepresentative } from 'src/api/companyRepresentative';
import { getCompanyById, updateCompany } from 'src/api/companies';
import { getInternshipsByCompany } from 'src/api/internships';
import type { Company } from 'src/api/models/Company';
import type { Internship } from 'src/api/models/Internship';
import type { CompanyRepresentative } from 'src/api/models/CompanyRepresentative';
import type { CompanyFormState } from 'src/components/forms/CompanyProfileForm.vue';

const companyFormVisible = ref(false);
const practiceFormVisible = ref(false);
const openCompanyForm = () => {
  companyFormVisible.value = true;
};

const openPracticeForm = () => {
  practiceFormVisible.value = true;
};

const queryClient = useQueryClient();

const handleCompanyUpdate = async (formData: CompanyFormState) => {
  await updateCompany(companyId.value!, formData);
  await queryClient.invalidateQueries({ queryKey: ['company'] });
  await queryClient.invalidateQueries({ queryKey: ['representative'] });
};

const { data: representative, isPending: repPending } = useQuery<CompanyRepresentative>({
  queryKey: ['representative'],
  queryFn: getMyCompanyRepresentative,
});

const companyId = computed(() => {
  const company = representative.value?.company;
  return company?.id;
});

const { data: company } = useQuery<Company>({
  queryKey: ['company', companyId],
  queryFn: () => getCompanyById(companyId.value!),
  enabled: computed(() => !!companyId.value),
});

const { data: internships, isPending: internshipsPending } = useQuery<Internship[]>({
  queryKey: ['company-internships', companyId],
  queryFn: () => getInternshipsByCompany(companyId.value!),
  enabled: computed(() => !!companyId.value),
});
</script>
