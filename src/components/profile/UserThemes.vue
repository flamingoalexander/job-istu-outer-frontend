<template>
  <q-inner-loading v-if="isLoading">
    <q-spinner-gears size="30px" color="primary" />
  </q-inner-loading>
  <div v-else>
    <!--    TODO вынести список с темами в универсальный компонент-->
    <h4>Взаимодействие с ИИТИАД:</h4>
    <div class="themes-container practice-themes q-mb-md">
      <h5>Темы производственной практики</h5>
      <!--      TODO переделать загрузку на скелетоны -->

      <div class="row items-center q-gutter-sm">
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
          @click="showCreateThemeDialog(ThemeTypes.PR)"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <div class="themes-container vkr-themes q-mb-md">
      <h5>Темы ВКР</h5>

      <div class="row items-center q-gutter-sm">
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
          @click="showCreateThemeDialog(ThemeTypes.VKR)"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <div class="themes-container niokr-themes">
      <h5>Темы НИОКР</h5>

      <div class="row items-center q-gutter-sm">
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
          @click="showCreateThemeDialog(ThemeTypes.NIOKR)"
          label="Добавить новую тему"
        />
      </div>
    </div>
    <CreateThemeDialog
      v-if="currentThemeType"
      v-model:visible="createDialogVisible"
      :themeType="currentThemeType"
    />
    <DeleteThemeDialog
      v-if="themeIdToDelete"
      v-model:visible="deleteDialogVisible"
      :themeId="themeIdToDelete"
    />
    <q-separator spaced />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from 'stores/user';
import { storeToRefs } from 'pinia';
import type { Theme } from 'src/types';
import { ThemeTypes } from 'src/types';
import CreateThemeDialog from 'components/profile/CreateThemeDialog.vue';
import DeleteThemeDialog from 'components/profile/DeleteThemeDialog.vue';

const userStore = useUserStore();
const { niokrThemes, practiceThemes, vkrThemes } = storeToRefs(userStore);

const isLoading = ref(false);
const createDialogVisible = ref(false);
const deleteDialogVisible = ref(false);
const themeIdToDelete = ref<number | null>(null);
const currentThemeType = ref<ThemeTypes | null>(null);

const showCreateThemeDialog = (themeType: ThemeTypes) => {
  currentThemeType.value = themeType;

  createDialogVisible.value = true;
};

const confirmDeleteTheme = (theme: Theme) => {
  themeIdToDelete.value = theme.id;
  deleteDialogVisible.value = true;
};
</script>

<style scoped>
.themes-container {
  margin-bottom: 16px;
}
</style>
