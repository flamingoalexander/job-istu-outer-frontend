<template>
  <div>
    <q-card class="bg-grey-8 text-white q-mb-lg">
      <q-card-section class="text-center">
        <q-avatar size="100px" class="bg-white q-mb-lg">
          <q-icon size="50px" color="grey-8" />
        </q-avatar>
        <div class="text-h4 text-weight-bold">{{ company }}</div>
      </q-card-section>
    </q-card>

    <div class="text-h5 text-weight-medium q-mb-lg text-grey-9">Контакты:</div>

    <q-card class="bg-grey-8 text-white">
      <q-card-section>
        <div class="q-gutter-y-xl">
          <div v-for="(contact, index) in contacts" :key="index">
            <div class="text-weight-bold text-h6">{{ contact.name }}</div>
            <div class="text-caption text-grey-3 q-mb-sm">{{ contact.position }}</div>
            <div class="text-caption text-grey-3">
              <div>Telegram: {{ contact.telegram }}</div>
              <div>Почта: {{ contact.email }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  company: string;
  contacts: Array<{
    name: string;
    position: string;
    telegram: string;
    email: string;
  }>;
}>();
</script>
