<script setup lang="ts">
import { UserRoles } from 'src/constants';

export type UserSectionButtonsProps = {
  role: UserRoles;
};
const props = defineProps<UserSectionButtonsProps>();
</script>

<template>
  <q-btn
    v-if="props.role === UserRoles.Student"
    color="primary"
    unelevated
    no-caps
    class="q-mr-sm"
    :to="{ name: 'internships' }"
    label="Практики (Student-Screen-1)"
  />
  <q-btn
    v-if="props.role === UserRoles.Student"
    color="primary"
    unelevated
    no-caps
    class="q-mr-sm"
    :to="{ name: 'practice-detail', params: { id: 1 } }"
    label="Конкретная практика (Student-Screen-1.1)"
  />
  <q-btn
    v-if="
      props.role === UserRoles.Student ||
      props.role === UserRoles.Teacher ||
      props.role === UserRoles.Directorate ||
      props.role === UserRoles.CareerCenter ||
      props.role === UserRoles.CompanyRepresentative
    "
    color="primary"
    unelevated
    no-caps
    class="q-mr-sm"
    :to="{ name: 'companies' }"
    label="Компании (Student-Screen-2)"
  />
  <q-btn
    v-if="props.role === UserRoles.CompanyRepresentative"
    color="primary"
    unelevated
    no-caps
    class="q-mr-sm"
    :to="{ name: 'practice-form' }"
    label="Форма создания практики (Company-Screen-1.1)"
  />
  <q-btn
    v-if="props.role === UserRoles.Teacher"
    color="primary"
    unelevated
    no-caps
    class="q-mr-sm"
    :to="{ name: 'teacher' }"
    label="Кабинет преподавателя (Teacher-Screen-1)"
  />
  <q-btn
    v-if="props.role === UserRoles.Student"
    color="primary"
    unelevated
    no-caps
    class="q-mr-sm"
    :to="{ name: 'student-internships' }"
    label="Кабинет студента (Student-Screen-3)"
  />
</template>

<style scoped></style>
