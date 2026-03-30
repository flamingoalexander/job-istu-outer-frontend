<template>
  <q-page :class="pagePadding">
    <!-- Pending representative -->
    <div v-if="repPending" class="text-center" :class="blockPadding">
      <q-spinner-dots color="primary" size="3em" />
      <div class="q-mt-sm text-grey-7">Загрузка данных...</div>
    </div>

    <div v-else class="row justify-center">
      <div class="col-12 col-md-10 col-lg-9">
        <!-- Карточка компании -->
        <q-card v-if="company" flat class="q-mb-md text-white primary-background border-radius-md">
          <div class="row items-center q-col-gutter-md q-pa-md">
            <!-- Текст -->
            <div class="col-12 col-sm-8">
              <div class="row items-center no-wrap">
                <div :class="isMobile ? 'text-h5' : 'text-h4'" class="text-weight-bold ellipsis">
                  {{ company.name }}
                </div>

                <q-btn
                  icon="edit"
                  size="sm"
                  flat
                  dense
                  round
                  color="white"
                  class="q-ml-sm"
                  @click="openCompanyForm"
                >
                  <q-tooltip>Редактировать профиль</q-tooltip>
                </q-btn>
              </div>

              <div class="text-body2 q-mt-xs">
                {{ company.area_of_activity }}
              </div>

              <div v-if="company.head_full_name" class="q-mt-md">
                <div class="text-body2">Руководитель: {{ company.head_full_name }}</div>
                <div class="text-body2">Должность: {{ company.head_job_title }}</div>
              </div>
            </div>

            <!-- Аватар: на мобилке по центру и меньше -->
            <div class="col-12 col-sm-4" :class="isMobile ? 'flex flex-center' : 'text-right'">
              <q-avatar :size="isMobile ? '88px' : '120px'" color="white">
                <img v-if="company.image_url" :src="company.image_url" :alt="company.name" />
                <q-icon v-else name="business" :size="isMobile ? '44px' : '60px'" color="grey-5" />
              </q-avatar>
            </div>
          </div>
        </q-card>

        <!-- Заголовок + кнопка -->
        <div class="row items-start q-col-gutter-md q-mb-md">
          <div class="col-12 col-sm">
            <div :class="isMobile ? 'text-h5' : 'text-h3'" class="text-weight-bold">
              Мои практики
            </div>
          </div>

          <div class="col-12 col-sm-auto">
            <q-btn
              label="Добавить практику"
              color="primary"
              unelevated
              class="full-width text-weight-bold"
              @click="openPracticeForm"
            />
          </div>
        </div>

        <!-- Pending internships -->
        <div v-if="internshipsPending" class="text-center q-pa-md">
          <q-spinner-hourglass color="primary" size="2em" />
          <div class="q-mt-xs text-grey-7">Загрузка практик...</div>
        </div>

        <!-- Список практик -->
        <template v-else-if="internships?.length">
          <div class="column q-gutter-md">
            <q-card
              v-for="internship in internships"
              :key="internship.id"
              flat
              class="text-white primary-background border-radius-md"
            >
              <!-- На мобилке делаем колонку (текст сверху, кнопка снизу) -->
              <div class="row q-col-gutter-md q-pa-md">
                <div class="col-12 col-md-8">
                  <div class="text-h6 text-weight-bold">
                    {{ internship.theme }}
                  </div>

                  <div v-if="internship.description" class="q-mt-xs">
                    {{ internship.description }}
                  </div>

                  <div v-if="internship.hire_count" class="q-mt-xs">
                    Количество мест: {{ internship.hire_count }}
                  </div>

                  <div class="q-mt-sm">
                    <div class="text-weight-bold">Специальности:</div>
                    <div class="text-body2">
                      {{ internship.specialities_list?.map((s) => s.name).join(', ') }}
                    </div>
                  </div>

                  <div class="q-mt-sm">
                    <div class="text-weight-bold">Навыки:</div>
                    <div class="row q-gutter-xs q-mt-xs">
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
                </div>

                <div class="col-12 col-md-4" :class="isMobile ? '' : 'text-right'">
                  <div class="text-subtitle1">
                    {{ internship.company_name }}
                  </div>

                  <q-btn
                    label="Подробнее"
                    color="white"
                    text-color="primary"
                    unelevated
                    class="text-weight-bold q-mt-md"
                    :class="isMobile ? 'full-width' : ''"
                    @click="openPracticeProfile(internship.id)"
                  />
                </div>
              </div>
            </q-card>
          </div>
        </template>

        <!-- Empty -->
        <q-banner v-else-if="internships?.length === 0" rounded class="bg-primary text-white">
          У компании пока нет добавленных практик.
        </q-banner>
      </div>
    </div>

    <!-- Forms -->
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
import { useQuasar } from 'quasar';
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
import { useRouter } from 'vue-router';

const $q = useQuasar();
const isMobile = computed(() => $q.screen.lt.sm);

const pagePadding = computed(() =>
  $q.screen.lt.sm ? 'q-pa-md' : $q.screen.lt.md ? 'q-pa-lg' : 'q-pa-xl',
);
const blockPadding = computed(() => ($q.screen.lt.sm ? 'q-pa-lg' : 'q-pa-xl'));

const router = useRouter();
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

const companyId = computed(() => representative.value?.company?.id);

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

const openPracticeProfile = (internshipId: number) => {
  router.push(`/company-practices/${internshipId}`).catch((error) => {
    console.error('Navigation error:', error);
  });
};
</script>
