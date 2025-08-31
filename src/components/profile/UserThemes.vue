<template>
  <div>
    <h4>Взаимодействие с ИИТИАД:</h4>

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
<!--    TODO вынести список с темами в универсальный компонент-->
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

<!--   TODO Вынести диалогт в отдельные компоненты. -->





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

const showPracticeThemeDialog = () => {
  currentThemeType.value = ThemeTypes.PR;
  dialogVisible.value = true;
};

const showVkrThemeDialog = () => {
  currentThemeType.value = ThemeTypes.VKR;
  dialogVisible.value = true;
};

const showNiokrThemeDialog = () => {
  currentThemeType.value = ThemeTypes.NIOKR;
  dialogVisible.value = true;
};




const confirmDeleteTheme = (theme: Theme) => {
  themeToDelete.value = theme; //TODO хранить ID
  confirmationDialogVisible.value = true;
};


</script>

<style scoped>
.themes-container {
  margin-bottom: 16px;
}
</style>
