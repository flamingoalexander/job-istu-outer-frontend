<template>
  <div>
    <div v-if="members.length === 0" class="text-center q-pa-xl">
      <div class="text-h5 text-white q-mb-md">Участников пока нет</div>
    </div>

    <div v-else>
      <div class="text-h5 text-white q-mb-md">Участники: {{ members.length }}</div>
      <div
        v-for="member in members"
        :key="member.id"
        class="bg-grey-4 q-pa-md q-mb-sm text-h6 text-black"
      >
        {{ member.studentName }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  members: Array<{
    id: number;
    studentName: string;
  }>;
}>();
</script>
