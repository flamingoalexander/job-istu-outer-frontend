<template>
  <q-card flat bordered class="q-pa-md q-mb-lg">
    <div class="row items-center q-col-gutter-md">
      <div class="col-12 col-md-auto">
        <q-img
          :src="practice.company.image_url"
          :ratio="1"
          style="width: 120px; max-width: 100%"
          :placeholder-src="fallbackImg"
          loading="lazy"
        />
      </div>

      <div class="col">
        <div class="text-h6">{{ practice.company.name }}</div>
        <div class="text-body2 text-grey-7 q-mt-xs">
          {{ practice.company.agreement }}
        </div>
      </div>

      <div class="col-auto">
        <q-btn
          :label="expanded ? 'Закрыть' : 'Подробнее'"
          color="primary"
          outline
          @click="toggle()"
          size="sm"
        />
      </div>
    </div>

    <q-separator class="q-my-md" />

    <div class="q-gutter-sm">
      <q-chip v-for="t in visibleThemes" :key="t.id" glossy size="md">
        {{ t.title }}
      </q-chip>

      <q-badge v-if="themesHiddenCount > 0" color="grey-5" text-color="grey-8" class="q-ml-sm">
        +{{ themesHiddenCount }}
      </q-badge>
    </div>

    <q-slide-transition>
      <div v-show="expanded" class="q-mt-md q-gutter-md">
        <div class="row items-start">
          <div class="col-12 col-md-6">
            <div class="text-subtitle2">Направление деятельности компании</div>
            <div class="text-body1 text-grey-7">
              {{ practice.company.area_of_activity || 'Нет данных' }}
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="text-subtitle2">ФИО и должность главы компании</div>
            <div class="text-body1 text-grey-7">
              {{ practice.company.head_full_name || 'Нет данных' }}
            </div>
          </div>
        </div>

        <q-separator />

        <div class="row q-col-gutter-sm">
          <div class="col-auto" v-for="link in practice.contacts" :key="link.id"></div>
        </div>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Practice } from 'src/types';

const props = defineProps<{
  practice: Practice;
  expanded?: boolean;
  maxCollapsedThemes?: number;
}>();

const emit = defineEmits<{
  (e: 'update:expanded', value: boolean): void;
}>();

const expanded = computed({
  get: () => props.expanded ?? false,
  set: (v: boolean) => emit('update:expanded', v),
});

const maxCollapsed = computed(() => props.maxCollapsedThemes ?? 3);

const visibleThemes = computed(() => {
  const all = props.practice.themes || [];
  return expanded.value ? all : all.slice(0, maxCollapsed.value);
});

const themesHiddenCount = computed(() => {
  const total = props.practice.themes?.length ?? 0;
  return Math.max(0, total - visibleThemes.value.length);
});

function toggle() {
  expanded.value = !expanded.value;
}

const fallbackImg =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
  <rect width="100%" height="100%" fill="#f2f2f2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" fill="#9e9e9e">
    Нет изображения
  </text>
</svg>
`);
</script>
