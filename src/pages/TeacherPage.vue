<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mb-md">
      <div class="text-h4 text-weight-bold">Заявки бакалавриат</div>
    </div>

    <div class="row q-col-gutter-md q-mb-md" style="max-width: 800px">
      <div class="col-12 col-sm-4">
        <q-select
          filled
          dense
          v-model="filters.group"
          :options="groupOptions"
          label="Все группы"
          emit-value
          map-options
          bg-color="white"
        />
      </div>
      <div class="col-12 col-sm-4">
        <q-select
          filled
          dense
          v-model="filters.status"
          :options="statusOptions"
          label="Все статусы"
          emit-value
          map-options
          bg-color="white"
        />
      </div>
      <div class="col-12 col-sm-4">
        <q-select
          filled
          dense
          v-model="filters.company"
          :options="companyOptions"
          label="Все компании"
          emit-value
          map-options
          bg-color="white"
        />
      </div>
    </div>

    <q-card flat bordered class="bg-white" v-if="!internshipsPending">
      <q-table
        :rows="internships ?? []"
        :columns="columns"
        row-key="id"
        flat
        bordered
        hide-pagination
        :pagination="{ rowsPerPage: 0 }"
      >
        <template v-slot:body-cell-action="props">
          <q-td :props="props" class="q-gutter-xs">
            <q-btn round dense icon="check" color="positive" size="sm">
              <q-tooltip>Одобрить</q-tooltip>
            </q-btn>
            <q-btn round dense icon="close" color="negative" size="sm">
              <q-tooltip>Отклонить</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { StudentsInternship } from 'src/api';
import { getStudentInternships } from 'src/api/teacher';
import { userAxiosClient } from 'src/api/axios.clients';

const { data: internships, isPending: internshipsPending } = useQuery<StudentsInternship[]>({
  queryKey: ['students-internships'],
  queryFn: async () => {
    const id = (await userAxiosClient.get('/auths/teacher/profile/')).data.id as number;
    return await getStudentInternships({ teacherId: id });
  },
});

interface Application {
  id: number;
  student_name: string;
  group: string;
  internship_theme: string;
  practice: string;
  status: string;
}

interface TableColumn {
  name: string;
  label: string;
  field: string | ((row: Application) => string);
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  required?: boolean;
}

const filters = reactive({
  group: '',
  status: '',
  company: '',
});

const groupOptions = [
  { label: 'Все группы', value: '' },
  { label: 'ИСИ6-22-1', value: 'ИСИ6-22-1' },
  { label: 'АСУ6-22-2', value: 'АСУ6-22-2' },
  { label: 'АСУ6-22-1', value: 'АСУ6-22-1' },
];

const statusOptions = [
  { label: 'Все статусы', value: '' },
  { label: 'Не проверено', value: 'Не проверено' },
  { label: 'Одобрено', value: 'Одобрено' },
  { label: 'Отклонено', value: 'Отклонено' },
];

const companyOptions = [
  { label: 'Все компании', value: '' },
  { label: 'ООО "МОЯ ОБОРОНА"', value: 'ООО "МОЯ ОБОРОНА"' },
  { label: 'ООО "Рога и копыта"', value: 'ООО "Рога и копыта"' },
];

const columns: TableColumn[] = [
  {
    name: 'studentName',
    required: true,
    label: 'ФИО Студента',
    align: 'left',
    field: (row: Application) => row.student_name,
    sortable: true,
  },
  {
    name: 'email',
    align: 'left',
    label: 'Почта',
    field: '',
    sortable: true,
  },
  {
    name: 'group',
    align: 'left',
    label: 'Группа',
    field: '',
    sortable: true,
  },
  {
    name: 'company',
    align: 'left',
    label: 'Компания',
    field: '',
    sortable: true,
  },
  {
    name: 'practice',
    align: 'left',
    label: 'Практика',
    field: (row: Application) => row.internship_theme,
    sortable: true,
  },
  {
    name: 'status',
    align: 'left',
    label: 'Статус',
    field: (row: Application) => row.status,
    sortable: true,
  },
  {
    name: 'action',
    align: 'center',
    label: 'Действие',
    field: 'action',
  },
];
// const filteredApplications = computed(() => {
//   return filter(internships, (internship: Application) => {
//     const matchGroup = !filters.group || application.group === filters.group;
//     const matchStatus = !filters.status || application.status === filters.status;
//     const matchCompany = !filters.company || application.company === filters.company;
//
//     return matchGroup && matchStatus && matchCompany;
//   });
// });
</script>
