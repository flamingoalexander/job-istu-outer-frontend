<template>
  <q-layout view="hHh LpR fff">
    <AppHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>

<script setup lang="ts">
import AppHeader from 'components/AppHeader.vue';
import AppFooter from 'components/AppFooter.vue';
</script>
