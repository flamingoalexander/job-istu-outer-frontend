<template>
  <q-page class="q-pa-xl bg-grey-2 q-pt-none">
    <div v-if="isPending" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
      <div class="q-ml-md">Загрузка практики...</div>
    </div>

    <div v-else-if="isError" class="flex flex-center q-pa-xl">
      <q-banner class="bg-red-1 text-red q-pa-md rounded-borders">
        <div class="text-h6">Ошибка загрузки</div>
        <div>{{ error?.message }}</div>
        <q-btn flat color="red" label="Назад" @click="router.back()" class="q-mt-md" />
      </q-banner>
    </div>

    <div v-else-if="internship" class="row">
      <div class="col-12 col-md-8">
        <div class="bg-grey-8 q-pa-xl text-black">
          <div class="text-h3 text-weight-bold q-mb-xl">
            {{ internship.theme }}
          </div>

          <div class="row q-mb-xl bg-grey-1">
            <div class="col-12">
              <q-tabs
                v-model="activeTab"
                dense
                class="full-width"
                active-color="grey-9"
                indicator-color="grey-9"
                align="left"
                narrow-indicator
              >
                <q-tab name="about" label="О стажировке" />
                <q-tab name="members" label="Участники" />
              </q-tabs>
            </div>
          </div>

          <div v-if="activeTab === 'about'" class="bg-grey-8 q-pa-xl">
            <div class="row q-mb-lg">
              <div class="col-12">
                <q-btn
                  color="grey-3"
                  unelevated
                  no-caps
                  label="Подать заявку"
                  text-color="black"
                  class="text-weight-bold"
                  size="1.1em"
                  padding="12px 32px"
                />
              </div>
            </div>

            <div class="q-mb-xl">
              <div class="text-h5 q-mb-lg text-weight-medium text-white">Описание:</div>
              <p class="text-body1 text-white">
                {{ internship.description || 'Описание отсутствует' }}
              </p>
            </div>

            <div class="row q-col-gutter-xl">
              <div class="col-12 col-md-6">
                <div class="text-h5 q-mb-lg text-weight-medium text-white">Специальности:</div>
                <div class="bg-grey-4 q-pa-lg" v-if="parsedSpecialities.length > 0">
                  <div class="q-gutter-sm">
                    <q-chip
                      v-for="specialty in parsedSpecialities"
                      :key="specialty.id"
                      color="grey-8"
                      text-color="white"
                      class="text-weight-medium"
                    >
                      {{ specialty.name }} ({{ specialty.code }})
                    </q-chip>
                  </div>
                </div>
                <div v-else class="bg-grey-4 q-pa-lg text-center text-white">
                  Нет специальностей
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="text-h5 q-mb-lg text-weight-medium text-white">Навыки:</div>
                <div class="bg-grey-4 q-pa-lg" v-if="parsedSkills.length > 0">
                  <div class="q-gutter-sm">
                    <q-chip
                      v-for="skill in parsedSkills"
                      :key="skill.id"
                      color="grey-8"
                      text-color="white"
                      class="text-weight-medium"
                    >
                      {{ skill.name }}
                    </q-chip>
                  </div>
                </div>
                <div v-else class="bg-grey-4 q-pa-lg text-center text-white">Нет навыков</div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'members'" class="bg-grey-8 q-pa-xl">
            <div v-if="isParticipantsLoading" class="flex flex-center q-pa-xl">
              <q-spinner color="white" size="2em" />
              <div class="q-ml-md text-white">Загрузка участников...</div>
            </div>
            <div v-else-if="participantsError" class="text-center text-white q-pa-xl">
              <div class="text-h6">Ошибка загрузки участников</div>
              <div class="text-caption">{{ participantsError.message }}</div>
              <q-btn
                flat
                color="white"
                label="Повторить"
                @click="handleRefetchParticipants"
                class="q-mt-md"
              />
            </div>
            <MembersList v-else :members="formattedParticipants" />
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4 q-pt-none">
        <div class="bg-grey-3 q-pa-xl">
          <CompanyInfo :company="internship.company_name" :contacts="formattedContacts" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery } from '@tanstack/vue-query';
import { getInternshipById } from 'src/api/internship';
import { getInternshipParticipants } from 'src/api/studentsInternships';
import type { Internship } from 'src/api/models/Internship';
import type { StudentsInternship } from 'src/api/models/StudentsInternship';
import CompanyInfo from 'components/internship-detail/CompanyInfo.vue';
import MembersList from 'components/internship-detail/MembersList.vue';

type Contact = {
  id: number;
  name: string;
  job_title: string;
  contact_type: string;
  value: string;
};

type Skill = {
  id: number;
  name: string;
};

type Speciality = {
  id: number;
  name: string;
  code: string;
};

const route = useRoute();
const router = useRouter();
const activeTab = ref('about');
const id = Number(route.params.id);

const {
  isPending: isInternshipPending,
  isError: isInternshipError,
  data: internship,
  error: internshipError,
} = useQuery<Internship>({
  queryKey: ['internship-detail', id],
  queryFn: () => getInternshipById(id),
  enabled: !isNaN(id),
  retry: 1,
  retryDelay: 1000,
});

const {
  isPending: isParticipantsLoading,
  data: participants,
  error: participantsError,
  refetch: refetchParticipants,
} = useQuery<StudentsInternship[]>({
  queryKey: ['internship-participants', id],
  queryFn: () => getInternshipParticipants(id),
  enabled: !isNaN(id) && activeTab.value === 'members',
  retry: 1,
  retryDelay: 1000,
});

const handleRefetchParticipants = () => {
  void refetchParticipants();
};

watch(activeTab, (newVal) => {
  if (newVal === 'members') {
    void refetchParticipants();
  }
});

const isPending = computed(() => isInternshipPending.value);
const isError = computed(() => isInternshipError.value);
const error = computed(() => internshipError.value);

const parsedSpecialities = computed<Speciality[]>(() => {
  return (internship.value?.specialities_list as unknown as Speciality[]) || [];
});

const parsedSkills = computed<Skill[]>(() => {
  return (internship.value?.skills_list as unknown as Skill[]) || [];
});

const parsedContacts = computed<Contact[]>(() => {
  return (internship.value?.contacts_list as unknown as Contact[]) || [];
});

const formattedContacts = computed(() => {
  return parsedContacts.value.map((contact) => ({
    name: contact.name || '',
    position: contact.job_title || '',
    type: contact.contact_type || '',
    value: contact.value || '',
  }));
});

const formattedParticipants = computed(() => {
  return (participants.value || []).map((p) => ({
    id: p.id,
    studentName: p.student_name,
  }));
});
</script>
