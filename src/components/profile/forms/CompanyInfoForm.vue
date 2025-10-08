<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import type { UserCompanyBaseInput } from 'src/api/user';

const props = defineProps<{
  userCompanyFormVisible: boolean;
  initial: UserCompanyBaseInput;
}>();

const emit = defineEmits<{
  (e: 'update:userCompanyFormVisible', value: boolean): void;
  (e: 'confirm', patch: UserCompanyBaseInput): void;
}>();

const form = reactive({
  image_url: '',
  name: '',
  area_of_activity: '',
  head_full_name: '',
  hire_count: 0 as number | null,
});

watch(
  () => props.userCompanyFormVisible,
  (v) => {
    if (v) {
      form.image_url = props.initial?.image_url ?? '';
      form.name = props.initial?.name ?? '';
      form.area_of_activity = props.initial?.area_of_activity ?? '';
      form.head_full_name = props.initial?.head_full_name ?? '';
      form.hire_count = props.initial?.hire_count ?? 0;
    }
  },
  { immediate: true },
);

function onCancel() {
  emit('update:userCompanyFormVisible', false);
}

function onConfirm() {
  emit('confirm', {
    image_url: form.image_url?.trim(),
    name: form.name.trim(),
    area_of_activity: form.area_of_activity?.trim(),
    head_full_name: form.head_full_name?.trim(),
    hire_count: Number(form.hire_count ?? 0),
  });
  emit('update:userCompanyFormVisible', false);
}
const imageLoading = ref(false);

function onImageLoad() {
  imageLoading.value = false;
}
</script>

<template>
  <q-dialog
    :model-value="userCompanyFormVisible"
    @update:model-value="(v) => emit('update:userCompanyFormVisible', !!v)"
  >
    <q-card style="min-width: 460px; max-width: 640px">
      <q-card-section class="text-h6 q-pa-md"> Редактирование данных о компании </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="column q-gutter-y-md">
          <q-input
            v-model="form.name"
            label="Название компании"
            outlined
            dense
            style="padding-bottom: 0px"
            :rules="[(val) => !!val || 'Название обязательно']"
          />
          <q-input
            v-model="form.area_of_activity"
            label="Направление деятельности"
            outlined
            dense
          />
          <q-input v-model="form.head_full_name" label="ФИО главы компании" outlined dense />
          <q-input
            v-model.number="form.hire_count"
            type="number"
            label="Количество студентов"
            outlined
            dense
            :min="0"
          />
          <q-input
            v-model="form.image_url"
            label="URL логотипа"
            outlined
            dense
            hint="Вставьте ссылку на изображение"
          />

          <div class="q-mt-sm">
            <q-img
              v-if="form.image_url"
              :src="form.image_url"
              class="q-rounded-md bordered"
              style="max-height: 30%; max-width: 30%; object-fit: contain"
              :alt="'Логотип компании'"
              :error-src="''"
              @load="onImageLoad"
              @loadstart="imageLoading = true"
            />
            <div v-else class="bg-grey-3 q-pa-md q-rounded-md text-grey-7">
              Предпросмотр логотипа
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Отмена" @click="onCancel" />
        <q-btn color="primary" label="Сохранить" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.bordered {
  border: 1px solid #e0e0e0;
}
</style>
