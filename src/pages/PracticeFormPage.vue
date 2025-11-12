<script setup lang="ts">
import { ref } from 'vue';
import PracticeForm from 'components/profile/forms/PracticeForm.vue';

const formVisible = ref(false);
</script>

<template>
  <q-btn @click="formVisible = !formVisible">Открыть форму</q-btn>
  <PracticeForm
    :formVisible
    @confirm="(v) => {}"
    @update:formVisible="(val) => (formVisible = val)"
  />
</template>

<style scoped></style>
