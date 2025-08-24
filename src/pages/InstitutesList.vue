<template>
  <div class="row q-col-gutter-md">
    <div v-for="inst in store.items" :key="inst.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
      <institute-card :imageUrl="inst.image_url" :name="inst.name" />
    </div>
  </div>
</template>

<script setup lang="ts">
import InstituteCard from 'components/InstituteCard.vue';
import { useInstitutesStore } from 'stores/institutes';
const store = useInstitutesStore();
</script>
