<script setup lang="ts">
import { ref } from 'vue';
import type { ThemeTypes } from 'src/types';
import { useUserStore } from 'stores/user';

export type CreateThemeDialogProps = {
  visible: boolean;
  themeType: ThemeTypes;
};
const props = defineProps<CreateThemeDialogProps>();
const emit = defineEmits(['createTheme', 'update:visible']);

const inputThemeValue = ref('');
const userStore = useUserStore();

const loading = ref(false);

const handleInputTheme = async (): Promise<void> => {
  loading.value = true;
  if (inputThemeValue.value.trim() && props.themeType) {
    await userStore.createTheme({ type: props.themeType, title: inputThemeValue.value });
  }
  inputThemeValue.value = '';
  emit('update:visible', false);
  loading.value = false;
};
</script>

<template>
  <q-dialog :model-value="props.visible" @update:model-value="(val) => emit('update:visible', val)">
    <q-card>
      <q-card-section>
        <q-input v-model="inputThemeValue" label="Введите тему" dense outlined />
      </q-card-section>
      <q-card-actions>
        <q-btn label="Cancel" color="primary" @click="emit('update:visible', false)" />
        <q-btn label="Save" color="primary" @click="handleInputTheme" :loading="loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
