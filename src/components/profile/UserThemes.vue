<template>
  <div>
    <h4>Взаимодействие с ИИТИАД:</h4>

    <!-- Темы производственной практики -->
    <div class="themes-container practice-themes q-mb-md">
      <h5>Темы производственной практики</h5>
      <q-skeleton v-if="isLoading" type="text" />
      <div v-else class="row items-center q-gutter-sm">
        <q-chip
          v-for="theme in practiceThemes"
          :key="theme.id"
          removable
          @remove="confirmDeleteTheme(theme)"
        >
          {{ theme.title }}
        </q-chip>

        <q-btn
          color="primary"
          size="sm"
          outline
          @click="showPracticeThemeDialog"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <!-- Темы ВКР -->
    <div class="themes-container vkr-themes q-mb-md">
      <h5>Темы ВКР</h5>
      <q-skeleton v-if="isLoading" type="text" />
      <div v-else class="row items-center q-gutter-sm">
        <q-chip
          v-for="theme in vkrThemes"
          :key="theme.id"
          color="orange"
          text-color="white"
          removable
          @remove="confirmDeleteTheme(theme)"
        >
          {{ theme.title }}
        </q-chip>

        <q-btn
          color="orange"
          size="sm"
          outline
          @click="showVkrThemeDialog"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <!-- Темы НИОКР -->
    <div class="themes-container niokr-themes">
      <h5>Темы НИОКР</h5>
      <q-skeleton v-if="isLoading" type="text" />
      <div v-else class="row items-center q-gutter-sm">
        <q-chip
          v-for="theme in niokrThemes"
          :key="theme.id"
          color="red"
          text-color="white"
          removable
          @remove="confirmDeleteTheme(theme)"
        >
          {{ theme.title }}
        </q-chip>

        <q-btn
          color="red"
          size="sm"
          outline
          @click="showNiokrThemeDialog"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <!-- Диалоговое окно для добавления новой темы -->
    <q-dialog v-model="dialogVisible">
      <q-card>
        <q-card-section>
          <q-input v-model="inputThemeValue" label="Введите тему" dense outlined />
        </q-card-section>
        <q-card-actions>
          <q-btn label="Cancel" color="primary" @click="dialogVisible = false" />
          <q-btn label="Save" color="primary" @click="handleInputTheme" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Подтверждение удаления темы -->
    <q-dialog v-model="confirmationDialogVisible">
      <q-card>
        <q-card-section> Вы действительно хотите удалить эту тему? </q-card-section>
        <q-card-actions>
          <q-btn label="Cancel" color="primary" @click="confirmationDialogVisible = false" />
          <q-btn label="Delete" color="negative" @click="handleDeleteTheme" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-separator spaced />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'stores/user';
import { storeToRefs } from 'pinia';
import type { Theme } from 'src/types';
import { ThemeTypes } from 'src/types';

const userStore = useUserStore();
const { niokrThemes, practiceThemes, vkrThemes } = storeToRefs(userStore);

const isLoading = ref(false);
const inputThemeValue = ref('');
const dialogVisible = ref(false);
const confirmationDialogVisible = ref(false);
const themeToDelete = ref<Theme | null>(null); // Тема для удаления
const currentThemeType = ref<ThemeTypes | null>(null); // Хранит тип темы для добавления

// Открыть диалог для добавления новой темы в производственную практику
const showPracticeThemeDialog = () => {
  currentThemeType.value = ThemeTypes.PR;
  dialogVisible.value = true;
};

// Открыть диалог для добавления новой темы в ВКР
const showVkrThemeDialog = () => {
  currentThemeType.value = ThemeTypes.VKR;
  dialogVisible.value = true;
};

// Открыть диалог для добавления новой темы в НИОКР
const showNiokrThemeDialog = () => {
  currentThemeType.value = ThemeTypes.NIOKR;
  dialogVisible.value = true;
};

// Обработчик ввода новой темы
const handleInputTheme = async (): Promise<void> => {
  if (inputThemeValue.value.trim() && currentThemeType.value) {
    await userStore.createTheme({ type: currentThemeType.value, title: inputThemeValue.value });
  }
  inputThemeValue.value = '';
  dialogVisible.value = false;
};

// Обработчик удаления темы с подтверждением
const confirmDeleteTheme = (theme: Theme) => {
  themeToDelete.value = theme; // Запоминаем тему, которую нужно удалить
  confirmationDialogVisible.value = true; // Показываем окно подтверждения
};

// Подтверждение удаления темы
const handleDeleteTheme = async () => {
  if (themeToDelete.value) {
    await userStore.deleteTheme(themeToDelete.value.id);
  }
  themeToDelete.value = null;
  confirmationDialogVisible.value = false; // Закрываем окно
};
</script>

<style scoped>
.themes-container {
  margin-bottom: 16px;
}
</style>
