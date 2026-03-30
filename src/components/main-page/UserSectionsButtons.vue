<script setup lang="ts">
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { UserRoles } from 'src/constants';

export type UserSectionButtonsProps = {
  role: UserRoles;
};
const props = defineProps<UserSectionButtonsProps>();

const $q = useQuasar();

// На телефоне делаем кнопки "в столбик" и full-width
const isMobile = computed(() => $q.screen.lt.sm);

const btnClass = computed(() => (isMobile.value ? 'full-width q-mb-sm' : 'q-mr-sm q-mb-sm'));
</script>

<template>
  <!-- Обертка-ряд: на sm+ кнопки идут в одну строку с переносом,
       на xs — каждая кнопка на всю ширину -->
  <div class="row items-start" :class="isMobile ? 'q-col-gutter-none' : 'q-col-gutter-sm'">
    <div class="col-auto" :class="isMobile ? 'col-12' : ''">
      <q-btn
        v-if="props.role === UserRoles.Student"
        color="primary"
        unelevated
        no-caps
        :class="btnClass"
        :to="{ name: 'internships' }"
        label="Практики (Student-Screen-1)"
      />
    </div>

    <div class="col-auto" :class="isMobile ? 'col-12' : ''">
      <q-btn
        v-if="props.role === UserRoles.Student"
        color="primary"
        unelevated
        no-caps
        :class="btnClass"
        :to="{ name: 'practice-detail', params: { id: 1 } }"
        label="Конкретная практика (Student-Screen-1.1)"
      />
    </div>

    <div class="col-auto" :class="isMobile ? 'col-12' : ''">
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
        :class="btnClass"
        :to="{ name: 'companies' }"
        label="Компании (Student-Screen-2)"
      />
    </div>

    <div class="col-auto" :class="isMobile ? 'col-12' : ''">
      <q-btn
        v-if="props.role === UserRoles.CompanyRepresentative"
        color="primary"
        unelevated
        no-caps
        :class="btnClass"
        :to="{ name: 'practice-form' }"
        label="Форма создания практики (Company-Screen-1.1)"
      />
    </div>

    <div class="col-auto" :class="isMobile ? 'col-12' : ''">
      <q-btn
        v-if="props.role === UserRoles.Teacher"
        color="primary"
        unelevated
        no-caps
        :class="btnClass"
        :to="{ name: 'teacher' }"
        label="Кабинет преподавателя (Teacher-Screen-1)"
      />
    </div>

    <div class="col-auto" :class="isMobile ? 'col-12' : ''">
      <q-btn
        v-if="props.role === UserRoles.Student"
        color="primary"
        unelevated
        no-caps
        :class="btnClass"
        :to="{ name: 'student-internships' }"
        label="Кабинет студента (Student-Screen-3)"
      />
    </div>

    <div class="col-auto" :class="isMobile ? 'col-12' : ''">
      <q-btn
        v-if="props.role === UserRoles.CompanyRepresentative"
        color="primary"
        unelevated
        no-caps
        :class="btnClass"
        :to="{ name: 'company-profile' }"
        label="Личный кабинет компании"
      />
    </div>
  </div>
</template>
