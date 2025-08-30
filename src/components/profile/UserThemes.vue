<template>
  <!-- Блок тем -->
  <div>
    <h2>Взаимодействие с ИИТИАД:</h2>

    <!-- Темы производственной практики -->
    <div class="themes-container practice-themes q-mb-md">
      <h4>Темы производственной практики</h4>
      <q-skeleton v-if="isLoading" type="text" />
      <div v-else class="row items-center q-gutter-sm">
        <q-chip
          v-for="theme in practiceThemes"
          :key="theme.id"
          removable
          @remove="handleCloseTheme(theme)"
        >
          {{ theme.title }}
        </q-chip>

        <q-input
          v-if="practiceThemeInputVisible"
          v-model="inputThemeValue"
          ref="inputRef"
          dense
          outlined
          class="w-20"
          @keyup.enter="handleInputThemePR('ПР')"
          @blur="handleInputThemePR('ПР')"
        />
        <q-btn
          v-else
          color="primary"
          size="sm"
          outline
          @click="showPracticeThemeInput"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <!-- Темы ВКР -->
    <div class="themes-container vkr-themes q-mb-md">
      <h4>Темы ВКР</h4>
      <q-skeleton v-if="isLoading" type="text" />
      <div v-else class="row items-center q-gutter-sm">
        <q-chip
          v-for="theme in vkrThemes"
          :key="theme.id"
          color="orange"
          text-color="white"
          removable
          @remove="handleCloseTheme(theme)"
        >
          {{ theme.title }}
        </q-chip>

        <q-input
          v-if="vkrThemeInputVisible"
          v-model="inputThemeValue"
          ref="inputRef"
          dense
          outlined
          class="w-20"
          @keyup.enter="handleInputThemePR('ВКР')"
          @blur="handleInputThemePR('ВКР')"
        />
        <q-btn
          v-else
          color="orange"
          size="sm"
          outline
          @click="showVkrThemeInput"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <!-- Темы НИОКР -->
    <div class="themes-container niokr-themes">
      <h4>Темы НИОКР</h4>
      <q-skeleton v-if="isLoading" type="text" />
      <div v-else class="row items-center q-gutter-sm">
        <q-chip
          v-for="theme in niokrThemes"
          :key="theme.id"
          color="red"
          text-color="white"
          removable
          @remove="handleCloseTheme(theme)"
        >
          {{ theme.title }}
        </q-chip>

        <q-input
          v-if="niokrThemeInputVisible"
          v-model="inputThemeValue"
          ref="inputRef"
          dense
          outlined
          class="w-20"
          @keyup.enter="handleInputThemePR('НИОКР')"
          @blur="handleInputThemePR('НИОКР')"
        />
        <q-btn
          v-else
          color="red"
          size="sm"
          outline
          @click="showNiokrThemeInput"
          label="Добавить новую тему"
        />
      </div>
    </div>

    <q-separator spaced />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)

const practiceThemes = ref([])

const inputThemeValue = ref('')

const practiceThemeInputVisible = ref(false)
const vkrThemeInputVisible = ref(false)
const niokrThemeInputVisible = ref(false)

const inputRef = ref(null)

function handleCloseTheme(theme) {
  console.log('Удаляем тему', theme)
}

function handleInputThemePR(type) {
  if (inputThemeValue.value.trim()) {
    console.log(`Добавляем тему в ${type}:`, inputThemeValue.value)
  }
  inputThemeValue.value = ''
  practiceThemeInputVisible.value = false
  vkrThemeInputVisible.value = false
  niokrThemeInputVisible.value = false
}

function showPracticeThemeInput() {
  practiceThemeInputVisible.value = true
  setTimeout(() => inputRef.value?.focus(), 50)
}

function showVkrThemeInput() {
  vkrThemeInputVisible.value = true
  setTimeout(() => inputRef.value?.focus(), 50)
}

function showNiokrThemeInput() {
  niokrThemeInputVisible.value = true
  setTimeout(() => inputRef.value?.focus(), 50)
}
</script>

<style scoped>
.themes-container {
  margin-bottom: 16px;
}
.w-20 {
  width: 200px;
}
</style>
