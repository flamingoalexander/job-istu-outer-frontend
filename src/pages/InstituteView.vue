<template>
    <!-- Оверлей загрузки -->
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="64px" />
      <div class="q-mt-md">Загрузка…</div>
    </q-inner-loading>

    <div v-if="!isLoading" class="q-gutter-y-lg">

      <!-- Верх: раскрывающаяся информация об институте -->
      <q-expansion-item
        icon="school"
        :label="currentInstitute?.name || 'Институт'"
        header-class="text-primary"
        expand-separator
        default-opened
      >
        <q-card flat>
          <q-card-section>
            <InstituteInfo :instId="instituteId" />
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <!-- Низ: список карточек практик -->
      <div>
        <q-banner v-if="practiceStorage.isEmpty" class="bg-blue-2 text-blue-10 q-mb-md">
          Ожидаем согласования перечня производственных партнёров
        </q-banner>

        <q-banner v-else-if="practiceStorage.status === StorageStatus.Error" class="bg-red-2 text-red-10 q-mb-md">
          Произошла ошибка при загрузке партнёров
        </q-banner>

        <div v-else class="q-gutter-y-md">
          <PracticeCard
            v-for="p in practiceStorage.items"
            :key="p.company.id"
            :practice="p"
            :max-collapsed-themes="3"
            :expanded="true"
          />
        </div>
      </div>

    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed, reactive } from 'vue'
import { useQuasar } from 'quasar'

import InstituteInfo from 'src/components/InstituteInfo.vue'
import PracticeCard from 'src/components/PracticeCard.vue'

import { useInstitutesStore } from 'stores/institutes'
import { usePracticesStore } from 'stores/practices'
import { StorageStatus } from 'stores';

const $q = useQuasar()

const props = defineProps<{
  instituteId: number
}>()

const institutesStorage = useInstitutesStore()
const practiceStorage = usePracticesStore()

const isLoading = ref(false)
const expandedMap = reactive<Record<string, boolean>>({})

const currentInstitute = computed(() =>
  institutesStorage.getById(props.instituteId)
)

onBeforeMount(async () => {
  isLoading.value = true
  try {
    if (props.instituteId != null) {
      await practiceStorage.setInstId(props.instituteId)
    }
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: e instanceof Error ? e.message : String(e)
    })
  } finally {
    isLoading.value = false
  }
})
</script>
