<script setup lang="ts">
import type { PropType } from 'vue';
import { ref } from 'vue';
import type { ThemeTypes } from 'src/types';
import { useUserStore } from 'stores/user';

const inputThemeValue = ref('');
const props = defineProps({
  dialogVisible: Boolean,
  themeType: String as PropType<ThemeTypes>,
});
const emit = defineEmits(['createTheme', 'update:dialogVisible']);

const userStore = useUserStore();

const handleInputTheme = async (): Promise<void> => {
  if (inputThemeValue.value.trim() && props.themeType) {
    await userStore.createTheme({ type: props.themeType, title: inputThemeValue.value });
  }
  inputThemeValue.value = '';
  emit('update:dialogVisible', false);
};
</script>

<template>
  <q-dialog
    :model-value="props.dialogVisible"
    @update:model-value="val => emit('update:dialogVisible', val)"
  >
    <q-card>
      <q-card-section>
        <q-input v-model="inputThemeValue" label="Введите тему" dense outlined />
      </q-card-section>
      <q-card-actions>
          <q-btn label="Cancel" color="primary" @click="emit('update:dialogVisible', false)" />
        <q-btn label="Save" color="primary" @click="handleInputTheme" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
