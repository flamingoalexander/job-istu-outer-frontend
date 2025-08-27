<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <router-link
        v-for="inst in store.items"
        :key="inst.id"
        :to="{ name: 'institute-detail', params: { instituteId: inst.id } }"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
        style="text-decoration: none"
      >
        <institute-card :image-url="inst.image_url" :name="inst.name" />
      </router-link>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import InstituteCard from 'components/main-page/InstituteCard.vue';
import { useInstitutesStore } from 'stores/institutes';
const store = useInstitutesStore();
</script>
