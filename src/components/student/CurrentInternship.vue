<template>
  <q-card class="q-mb-lg primary-background border-radius-md" flat bordered>
    <div class="row justify-between">
      <q-card-section class="col-12 col-md-8">
        <div class="text-h6 text-weight-bold text-white">
          {{ internship.title }}
        </div>
        <div class="text-subtitle1 text-weight-bold q-mt-sm text-white">
          Тип практики: {{ internship.type }}
        </div>
        <div class="text-subtitle1 text-weight-bold text-white">
          Дата: {{ internship.dates?.start }} - {{ internship.dates?.end }}
        </div>

        <div class="row items-center text-white">
          <q-checkbox
            :model-value="internship.status.approvedCompany"
            @update:model-value="updateField('approvedCompany', $event)"
            label="Одобрено компанией"
            color="primary"
            class="no-pointer-events"
          />
          <q-checkbox
            :model-value="internship.status.approvedTeacher"
            @update:model-value="updateField('approvedTeacher', $event)"
            label="Одобрено преподавателем"
            color="primary"
            class="no-pointer-events"
          />
        </div>

        <div class="q-mt-xs">
          <div v-if="!internship.status.approvedTeacher" class="row q-gutter-xs">
            <q-btn
              label="Загрузить индивидуальное задание"
              color="white"
              text-color="primary"
              unelevated
              class="text-weight-bold"
            />
            <q-btn
              label="Скачать шаблон индивидуального задания"
              color="white"
              text-color="primary"
              unelevated
              class="text-weight-bold"
            />
          </div>

          <div v-else class="row q-gutter-xs">
            <div v-if="internship.status.grade === null" class="col-12">
              <q-input
                :model-value="internship.status.reportUrl"
                @update:model-value="updateField('reportUrl', $event)"
                label="Ссылка на отчёт (Яндекс Диск)"
                filled
                dense
                bg-color="white"
                color="primary"
                hide-bottom-space
                label-color="primary"
                style="max-width: 400px"
                class="q-mb-sm"
              />
              <q-btn
                color="white"
                text-color="primary"
                unelevated
                class="text-weight-bold"
                label="Отправить отчёт"
              />
            </div>

            <div v-else-if="internship.status.grade <= 2" class="col-12">
              <div class="text-body1 q-mb-md text-white text-weight-bold">
                Оценка за практику: {{ internship.status.grade }}
              </div>
              <q-input
                :model-value="internship.status.reportUrl"
                @update:model-value="updateField('reportUrl', $event)"
                label="Ссылка на отчёт (Яндекс Диск)"
                filled
                dense
                bg-color="white"
                color="primary"
                hide-bottom-space
                label-color="primary"
                style="max-width: 400px"
                class="q-mb-sm"
              />
              <q-btn
                color="white"
                text-color="primary"
                unelevated
                class="text-weight-bold"
                label="Переотправить отчёт"
              />
            </div>

            <div v-else class="col-12">
              <div class="text-body1 q-mb-md text-white text-weight-bold">
                Оценка: {{ internship.status.grade }}
              </div>
              <div class="row q-gutter-xs">
                <q-btn
                  color="white"
                  text-color="primary"
                  unelevated
                  class="text-weight-bold"
                  label="Загрузить индивидуальное задание"
                />
                <q-btn
                  color="white"
                  text-color="primary"
                  unelevated
                  class="text-weight-bold"
                  label="Загрузить характеристику"
                />
                <q-btn
                  color="white"
                  text-color="primary"
                  unelevated
                  class="text-weight-bold"
                  label="Загрузить дневник"
                />
                <q-btn
                  color="white"
                  text-color="primary"
                  unelevated
                  class="text-weight-bold"
                  label="Загрузить отчёт"
                />
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="col-12 col-md-3 text-right">
        <div class="row items-center justify-end q-gutter-sm">
          <div class="text-h6 text-weight-bold text-white">{{ internship.company }}</div>
          <q-avatar size="40px" color="white"></q-avatar>
        </div>
        <div class="q-mt-sm">
          <div class="subtitle-1 text-weight-bold text-white">
            Преподаватель: {{ internship.teacher }}
          </div>
        </div>
        <q-btn
          label="Чат"
          class="q-mt-md text-weight-bold"
          color="white"
          text-color="primary"
          unelevated
        />
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import type { StudentInternship } from 'src/types';

const props = defineProps<{
  internship: StudentInternship;
}>();

const emit = defineEmits(['update:internship']);

const updateField = (
  field: keyof StudentInternship['status'],
  value: StudentInternship['status'][typeof field],
) => {
  emit('update:internship', {
    ...props.internship,
    status: {
      ...props.internship.status,
      [field]: value,
    },
  });
};
</script>
