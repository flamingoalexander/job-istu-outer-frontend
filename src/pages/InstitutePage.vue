<template>
  <q-inner-loading :showing="isLoading">
    <q-spinner-gears size="64px" />
    <div class="q-mt-md">Загрузка…</div>
  </q-inner-loading>
  <div v-if="!isLoading" class="q-gutter-y-lg">
    <InstituteInfo :instId="instituteId" />
    <div>
      <q-banner v-if="practiceStorage.isEmpty" class="bg-blue-2 text-blue-10 q-mb-md">
        Ожидаем согласования перечня производственных партнёров
      </q-banner>
      <q-banner
        v-else-if="practiceStorage.status === StorageStatus.Error"
        class="bg-red-2 text-red-10 q-mb-md"
      >
        Произошла ошибка при загрузке партнёров
      </q-banner>
      <div v-else class="q-gutter-y-md padding" >
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
import { onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';

import InstituteInfo from 'components/institute-page/InstituteInfo.vue';
import PracticeCard from 'components/institute-page/PracticeCard.vue';

import { usePracticesStore } from 'stores/practices';
import { StorageStatus } from 'stores';

const $q = useQuasar();

const props = defineProps<{
  instituteId: number;
}>();
const practiceStorage = usePracticesStore();

const isLoading = ref(false);
onBeforeMount(async () => {
  isLoading.value = true;
  try {
    if (props.instituteId != null) {
      await practiceStorage.setInstId(props.instituteId);
    }
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: e instanceof Error ? e.message : String(e),
    });
  } finally {
    isLoading.value = false;
  }
});
</script>
