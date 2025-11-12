<script setup lang="ts">
import { reactive } from 'vue';
import { defaults } from 'lodash';
export type PracticeFormState = {
  theme: string;
  specialities: string[];
  skills: string[];
  task: string;
  goal: string;
  isActive: boolean;
};
const defaultValues = {
  theme: '',
  specialities: [],
  skills: [],
  task: '',
  goal: '',
  isActive: false,
} as const;
const props = defineProps<{
  formVisible: boolean;
  initial?: PracticeFormState;
}>();

const emit = defineEmits<{
  (e: 'update:formVisible', value: boolean): void;
  (e: 'confirm', patch: PracticeFormState): void;
}>();

const formState = reactive<PracticeFormState>(defaults(props.initial, defaultValues));
const specialities = [
  { label: 'ИСиС', value: 'ИСиС' },
  { label: 'АСУ', value: 'АСУ' },
  { label: 'ЭВМБ', value: 'ЭВМБ' },
  { label: 'ИБС', value: 'ИБС' },
];
const skills = [
  { label: 'Python', value: 'Python' },
  { label: 'Fast API', value: 'Fast API' },
  { label: 'Веб-программирование', value: 'Веб-программирование' },
];
function onCancel() {
  emit('update:formVisible', false);
}

const onConfirm = () => {
  emit('confirm', formState);
  emit('update:formVisible', false);
};
</script>

<template>
  <q-dialog :model-value="formVisible" @update:model-value="(v) => emit('update:formVisible', v)">
    <q-card class="q-dialog-plugin full-width q-pa-lg" style="max-width: 800px">
      <q-card-section class="q-pa-none">
        <div class="text-h6 q-mb-lg">Добавить практику</div>
        <q-form @submit="onConfirm" @reset="onCancel" color="white">
          <div class="row justify-between q-gutter-lg">
            <div class="col-sm-5 col-xs-11 q-gutter-sm">
              <q-input
                filled
                dense
                v-model="formState.theme"
                label="Тема практики"
                hint="Введите тему практики"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Тема практики не может быть пустой.']"
              />
              <q-input
                filled
                dense
                v-model="formState.goal"
                label="Цель"
                hint="Введите цель"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Цель практики не может быть пустой.']"
              />
              <q-input
                dense
                filled
                v-model="formState.task"
                label="Задачи"
                hint="Введите задачи"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Задачи практики не может быть пустой.',
                ]"
              />
            </div>

            <div class="col-sm-5 col-xs-11 column justify-lg-between q-gutter-sm">
              <q-select
                filled
                dense
                v-model="formState.specialities"
                :options="specialities"
                multiple
                emit-value
                map-options
                use-chips
                label="Cпециальности"
                hint="Выберете специальности"
                hide-bottom-space
              />
              <q-select
                filled
                dense
                v-model="formState.skills"
                :options="skills"
                multiple
                emit-value
                map-options
                use-chips
                label="Навыки"
                hint="Выберете навыки"
                hide-bottom-space
              />
              <q-toggle v-model="formState.isActive" label="Набор открыт" />
            </div>
          </div>
          <div class="q-mt-lg">
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
