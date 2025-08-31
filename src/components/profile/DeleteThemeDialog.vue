<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { ref } from 'vue';

export type DeleteThemeDialogProps = {
  themeId: number;
  visible: boolean;
};

const props = defineProps<DeleteThemeDialogProps>();

const emit = defineEmits(['update:visible']);
const loading = ref(false);
const userStore = useUserStore();
const handleDeleteTheme = async () => {
  loading.value = true;
  await userStore.deleteTheme(props.themeId);
  emit('update:visible', false);
  loading.value = false;
};
</script>

<template>
  <q-dialog :model-value="props.visible" @update:model-value="(val) => emit('update:visible', val)">
    <q-card>
      <q-card-section> Вы действительно хотите удалить эту тему? </q-card-section>
      <q-card-actions>
        <q-btn label="Cancel" color="primary" @click="emit('update:visible', false)" />
        <q-btn label="Delete" color="negative" @click="handleDeleteTheme" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
