<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <!--      <router-link-->
      <!--        v-for="inst in store.items"-->
      <!--        :key="inst.id"-->
      <!--        :to="{ name: 'institute', params: { instituteId: inst.id } }"-->
      <!--        class="col-12 col-sm-6 col-md-4 col-lg-3"-->
      <!--        style="text-decoration: none"-->
      <!--      >-->
      <!--        <institute-card :image-url="inst.image_url" :name="inst.name" />-->
      <!--      </router-link>-->
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'internships' }"
        label="Практики (Student-Screen-1)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'register' }"
        label="Конкретная практика (Student-Screen-1.1)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'companies' }"
        label="Компании (Student-Screen-2)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'practice-form' }"
        label="Форма создания практики (Company-Screen-1.1)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'teacher' }"
        label="Кабинет преподавателя (Teacher-Screen-1)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'student-internships' }"
        label="Кабинет студента (Student-Screen-3)"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import InstituteCard from 'components/main-page/InstituteCard.vue';
// import { useInstitutesStore } from 'stores/institutes';
// const store = useInstitutesStore();
</script>
