<template>
  <q-card flat bordered class="q-pa-md q-gutter-y-md">
    <div class="row items-center q-col-gutter-md">
      <div class="col-12 col-md-auto">
        <q-img
          :src="currentInstitute?.image_url"
          alt="Логотип ИРНИТУ"
          ratio="1"
          style="width: 12rem; max-width: 100%"
          :placeholder-src="fallbackImg"
          loading="lazy"
        />
      </div>

      <div class="col">
        <div class="text-h5">
          Промышленные партнёры института
          <br />
          “{{ currentInstitute?.name }}”
        </div>
      </div>
    </div>

    <q-separator />

    <!-- Секции направлений -->
    <div class="q-gutter-y-lg">
      <section v-if="bachelor.length">
        <div class="text-h6 q-mb-sm">Бакалавриат</div>
        <div class="row q-col-gutter-sm">
          <div v-for="dir in bachelor" :key="dir.id" class="col-auto">
            <q-chip clickable :href="dir.url || undefined" target="_blank" rel="noopener" glossy>
              {{ dir.short_name }}
              <q-tooltip anchor="bottom middle" self="top middle" class="bg-grey-9 text-white">
                {{ dir.full_name }}
              </q-tooltip>
            </q-chip>
          </div>
        </div>
        <q-separator class="q-mt-md" />
      </section>

      <section v-if="magistracy.length">
        <div class="text-h6 q-mb-sm">Магистратура</div>
        <div class="row q-col-gutter-sm">
          <div v-for="dir in magistracy" :key="dir.id" class="col-auto">
            <q-chip clickable :href="dir.url || undefined" target="_blank" rel="noopener" glossy>
              {{ dir.short_name }}
              <q-tooltip anchor="bottom middle" self="top middle" class="bg-grey-9 text-white">
                {{ dir.full_name }}
              </q-tooltip>
            </q-chip>
          </div>
        </div>
        <q-separator class="q-mt-md" />
      </section>

      <section v-if="specialty.length">
        <div class="text-h6 q-mb-sm">Специалитет</div>
        <div class="row q-col-gutter-sm">
          <div v-for="dir in specialty" :key="dir.id" class="col-auto">
            <q-chip clickable :href="dir.url || undefined" target="_blank" rel="noopener" glossy>
              {{ dir.short_name }}
              <q-tooltip anchor="bottom middle" self="top middle" class="bg-grey-9 text-white">
                {{ dir.full_name }}
              </q-tooltip>
            </q-chip>
          </div>
        </div>
        <q-separator class="q-mt-md" />
      </section>

      <section v-if="other.length">
        <div class="text-h6 q-mb-sm">Другие</div>
        <div class="row q-col-gutter-sm">
          <div v-for="dir in other" :key="dir.id" class="col-auto">
            <q-chip clickable :href="dir.url || undefined" target="_blank" rel="noopener" glossy>
              {{ dir.short_name }}
              <q-tooltip anchor="bottom middle" self="top middle" class="bg-grey-9 text-white">
                {{ dir.full_name }}
              </q-tooltip>
            </q-chip>
          </div>
        </div>
      </section>
    </div>

    <!-- Кнопка "На главную" -->
    <div class="row justify-end q-mt-lg">
      <q-btn color="grey-7" flat :to="{ name: 'home' }" label="На главную" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useInstitutesStore } from 'stores/institutes';

const props = defineProps<{
  instId: number | string;
}>();

const store = useInstitutesStore();

const currentInstitute = computed(() => store.getById(Number(props.instId)));

const directions = computed(() => currentInstitute.value?.directions?.flat?.() ?? []);

const bachelor = computed(() => directions.value.filter((d) => d.education_level === 0));
const magistracy = computed(() => directions.value.filter((d) => d.education_level === 2));
const specialty = computed(() => directions.value.filter((d) => d.education_level === 1));
const other = computed(() =>
  directions.value.filter(
    (d) => d.education_level !== 0 && d.education_level !== 1 && d.education_level !== 2,
  ),
);

// запасная картинка
const fallbackImg =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <rect width="100%" height="100%" fill="#f2f2f2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="#9e9e9e">
    Нет изображения
  </text>
</svg>
`);
</script>
