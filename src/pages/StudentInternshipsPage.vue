<template>
  <q-page class="q-pa-xl">
    <div class="text-h3 q-mb-lg text-weight-bold">Мои практики</div>

    <div v-if="profileLoading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
      <div class="q-ml-md">Загрузка профиля...</div>
    </div>

    <div v-else-if="profileError" class="flex flex-center q-pa-xl">
      <q-banner class="bg-red-1 text-red q-pa-md rounded-borders">
        <div class="text-h6">Ошибка загрузки профиля</div>
        <div>{{ profileError.message }}</div>
        <q-btn flat color="red" label="Повторить" @click="handleRefetchProfile" class="q-mt-md" />
      </q-banner>
    </div>

    <template v-else-if="profile">
      <div v-if="internshipsLoading" class="flex flex-center q-pa-xl">
        <q-spinner color="primary" size="3em" />
        <div class="q-ml-md">Загрузка практик...</div>
      </div>

      <div v-else-if="internshipsError" class="flex flex-center q-pa-xl">
        <q-banner class="bg-red-1 text-red q-pa-md rounded-borders">
          <div class="text-h6">Ошибка загрузки практик</div>
          <div>{{ internshipsError.message }}</div>
          <q-btn
            flat
            color="red"
            label="Повторить"
            @click="handleRefetchInternships"
            class="q-mt-md"
          />
        </q-banner>
      </div>

      <template v-else>
        <template v-if="currentInternships.length > 0">
          <div class="text-h4 q-mb-sm text-weight-bold">Текущая</div>
          <CurrentInternship v-for="item in currentInternships" :key="item.id" :internship="item" />
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

        <div class="q-mt-xl" v-if="previousInternships.length > 0">
          <div class="text-h4 q-mb-md text-weight-bold">Прошлые</div>
          <PreviousInternship
            v-for="item in previousInternships"
            :key="item.id"
            :internship="item"
          />
        </div>

        <div class="q-mt-xl" v-if="rejectedInternships.length > 0">
          <div class="text-h4 q-mb-md text-weight-bold">Отклоненные</div>
          <PreviousInternship
            v-for="item in rejectedInternships"
            :key="item.id"
            :internship="item"
          />
        </div>
      </template>
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { getStudentProfile } from 'src/api/studentProfile';
import { getStudentInternships } from 'src/api/studentsInternships';
import type { StudentsInternship } from 'src/api/models/StudentsInternship';
import CurrentInternship from 'src/components/student/CurrentInternship.vue';
import PreviousInternship from 'src/components/student/PreviousInternship.vue';
import { StudentsInternshipStatusEnum } from 'src/api/models/StudentsInternshipStatusEnum';

const {
  data: profile,
  isPending: profileLoading,
  error: profileError,
  refetch: refetchProfile,
} = useQuery({
  queryKey: ['student-profile'],
  queryFn: getStudentProfile,
});

const handleRefetchProfile = () => {
  void refetchProfile();
};

const studentId = computed(() => profile.value?.id);

const {
  data: internships,
  isPending: internshipsLoading,
  error: internshipsError,
  refetch: refetchInternships,
} = useQuery<StudentsInternship[]>({
  queryKey: ['student-internships', studentId],
  queryFn: async () => {
    const id = studentId.value;
    if (!id) return [];
    return await getStudentInternships(id);
  },
  enabled: !!studentId.value,
});

const handleRefetchInternships = () => {
  void refetchInternships();
};

const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  try {
    const str = String(dateString);
    const datePart = str.split('T')[0];
    if (!datePart) return '';
    const parts = datePart.split('-');
    if (parts.length !== 3) return '';
    return parts.reverse().join('.');
  } catch {
    return '';
  }
};

const mapToInternship = (item: StudentsInternship) => ({
  id: item.id,
  title: item.internship_theme,
  company: '',
  image: '',
  type: item.internship_type_display,
  teacher: item.teacher_name,
  specialities: [],
  skills: [],
  status: {
    approvedCompany: true,
    approvedTeacher: item.status === StudentsInternshipStatusEnum['_1'],
    grade: item.status === StudentsInternshipStatusEnum['_3'] ? 5 : null,
    reportUrl: '',
  },
  dates: {
    start: item?.created_at ? formatDate(item.created_at) : '',
    end: '',
  },
});

const currentInternships = computed(() => {
  if (!internships.value) return [];
  return internships.value
    .filter(
      (item: StudentsInternship) =>
        item.status === StudentsInternshipStatusEnum['_0'] ||
        item.status === StudentsInternshipStatusEnum['_1'],
    )
    .map(mapToInternship);
});

const previousInternships = computed(() => {
  if (!internships.value) return [];
  return internships.value
    .filter((item: StudentsInternship) => item.status === StudentsInternshipStatusEnum['_3'])
    .map(mapToInternship);
});

const rejectedInternships = computed(() => {
  if (!internships.value) return [];
  return internships.value
    .filter((item: StudentsInternship) => item.status === StudentsInternshipStatusEnum['_2'])
    .map(mapToInternship);
});
</script>
