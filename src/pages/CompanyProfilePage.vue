<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row q-col-gutter-md justify-center">
      <div class="col-12 col-md-7">
      <span v-if="repPending">Loading...</span>
      <span v-else-if="repError">Error loading user data</span>
      <div v-if="companyPending">Loading...</div>
      <div v-else-if="companyError">Error loading company</div>

        <q-card
          v-if="company"
          flat
          class="q-mb-sm row justify-between text-white primary-background border-radius-md"
        >
          <q-card-section class="col-12 col-md-8">

            <div class="text-h4 text-weight-bold">
              {{ company.name }}
            </div>

            <div class="q-mt-md text-body2">
              {{ company.area_of_activity }}
            </div>

          </q-card-section>

          <q-card-section class="col-12 col-md-3 text-right">
            <q-avatar size="120px" color="white">
              <img v-if="company.image_url" :src="company.image_url" />
              <q-icon v-else name="business" size="60px" />
            </q-avatar>
          </q-card-section>
        </q-card>

        <div class="text-h3 q-mb-md text-weight-bold">Мои практики</div>

        <q-btn
        label="Добавить практику"
        color="primary"
        unelevated
        class="q-mb-lg text-weight-bold"
        />
        <span v-if="internshipsPending">Loading internships...</span>
        <span v-else-if="internshipsError">Error: {{ error?.message }}</span>

        <q-card
          v-else
          v-for="internship in internships"
          :key="internship.id"
          flat
          class="q-mb-sm row items-center justify-between text-white primary-background border-radius-md"
        >
          <q-card-section class="col-12 col-md-8">

            <div class="text-h6 text-weight-bold">
              {{ internship.theme }}
            </div>

            <div class="q-mt-xs">
              {{ internship.specialities_list }}
            </div>

            <div class="q-mt-xs">
              {{ internship.skills_list }}
            </div>

          </q-card-section>

          <q-card-section class="col-12 col-md-3 text-right">
            <div class="text-h6 text-weight-bold">
              {{ internship.company_name }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { getMyCompanyRepresentative } from 'src/api/companyRepresentative';
import { getCompanyById } from 'src/api/companies';
import { getInternshipsByCompany } from 'src/api/internships';
import { type Company } from 'src/api/models/Company';
import { type Internship } from 'src/api/models/Internship';
import { type CompanyRepresentative } from 'src/api/models/CompanyRepresentative';

const {
  data: representative,
  isPending: repPending,
  isError: repError,
} = useQuery<CompanyRepresentative>({
  queryKey: ['representative'],
  queryFn: getMyCompanyRepresentative,
});


const {
  data: company,
  isPending: companyPending,
  isError: companyError,
} = useQuery<Company>({
  queryKey: ['company', representative?.value?.company],
  queryFn: () => getCompanyById(representative!.value!.company!),
  enabled: !!representative?.value?.company,
});

const {
  data: internships,
  isPending: internshipsPending,
  isError: internshipsError,
  error,
} = useQuery<Internship[]>({
  queryKey: ['company-internships', representative?.value?.company],
  queryFn: () => getInternshipsByCompany(representative!.value!.company!),
  enabled: !!representative?.value?.company,
});
</script>

<style scoped></style>