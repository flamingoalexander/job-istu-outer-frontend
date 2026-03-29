<script setup lang="ts">
import { reactive, watch } from 'vue';
import { defaults } from 'lodash';
import type { Company } from 'src/api/models/Company';

export type CompanyFormState = {
  name: string;
  image_url: string;
  area_of_activity: string;
  head_full_name: string;
  head_job_title: string;
};

const defaultValues: CompanyFormState = {
  name: '',
  image_url: '',
  area_of_activity: '',
  head_full_name: '',
  head_job_title: '',
};

const props = defineProps<{
  formVisible: boolean;
  initial?: Partial<Company>;
}>();

const emit = defineEmits<{
  (e: 'update:formVisible', value: boolean): void;
  (e: 'confirm', data: CompanyFormState): void;
}>();

const formState = reactive<CompanyFormState>(defaults({}, props.initial, defaultValues));

watch(
  () => props.initial,
  (newInitial) => {
    if (newInitial) {
      Object.assign(formState, defaults({}, newInitial, defaultValues));
    }
  },
  { immediate: true },
);

function onCancel() {
  emit('update:formVisible', false);
}

const onConfirm = () => {
  emit('confirm', formState);
};
</script>

<template>
  <q-dialog
    :model-value="formVisible"
    @update:model-value="(v) => emit('update:formVisible', v)"
    persistent
  >
    <q-card class="q-dialog-plugin full-width q-pa-lg" style="max-width: 800px">
      <q-card-section class="q-pa-none">
        <div class="text-h6 q-mb-lg">Редактировать профиль компании</div>
        <q-form @submit="onConfirm" @reset="onCancel" color="white">
          <div class="row q-col-gutter-md">
            <div class="col-12">
              <q-input
                filled
                dense
                v-model="formState.name"
                label="Название компании"
                hint="Введите название компании"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Название не может быть пустым.']"
              />
            </div>

            <div class="col-12">
              <q-input
                filled
                dense
                v-model="formState.image_url"
                label="URL логотипа"
                hint="Введите ссылку на изображение"
                type="url"
              />
            </div>

            <div class="col-12">
              <q-input
                filled
                dense
                v-model="formState.area_of_activity"
                label="Сфера деятельности"
                hint="Введите сферу деятельности"
              />
            </div>

            <div class="col-6">
              <q-input
                filled
                dense
                v-model="formState.head_full_name"
                label="ФИО руководителя"
                hint="Введите ФИО руководителя"
              />
            </div>

            <div class="col-6">
              <q-input
                filled
                dense
                v-model="formState.head_job_title"
                label="Должность руководителя"
                hint="Введите должность"
              />
            </div>
          </div>

          <div class="q-mt-lg">
            <q-btn label="Сохранить" type="submit" color="primary" />
            <q-btn label="Отмена" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
