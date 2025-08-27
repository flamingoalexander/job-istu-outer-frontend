<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps<{
  userCompanyFormVisible: boolean
  initial?: {
    image_url?: string
    name?: string
    area_of_activity?: string
    head_full_name?: string
    agreement?: string
    hire_count?: number
  }
}>()

const emit = defineEmits<{
  (e: 'update:userCompanyFormVisible', value: boolean): void
  (e: 'confirm', patch: {
    image_url?: string
    name?: string
    area_of_activity?: string
    head_full_name?: string
    agreement?: string
    hire_count?: number
  }): void
}>()

/** локальная форма (моки) — не трогаем родителя до подтверждения */
const form = reactive({
  image_url: '',
  name: '',
  area_of_activity: '',
  head_full_name: '',
  agreement: '',
  hire_count: 0 as number | null
})

watch(
  () => props.userCompanyFormVisible,
  (v) => {
    if (v) {
      form.image_url = props.initial?.image_url ?? ''
      form.name = props.initial?.name ?? ''
      form.area_of_activity = props.initial?.area_of_activity ?? ''
      form.head_full_name = props.initial?.head_full_name ?? ''
      form.agreement = props.initial?.agreement ?? ''
      form.hire_count = props.initial?.hire_count ?? 0
    }
  },
  { immediate: true }
)

function onCancel() {
  emit('update:userCompanyFormVisible', false)
}

function onConfirm() {
  if (!form.name.trim()) {
    $q.notify({ type: 'warning', message: 'Укажите название компании' })
    return
  }
  if (form.hire_count != null && form.hire_count < 0) {
    $q.notify({ type: 'warning', message: 'Количество студентов не может быть отрицательным' })
    return
  }

  emit('confirm', {
    image_url: form.image_url?.trim(),
    name: form.name.trim(),
    area_of_activity: form.area_of_activity?.trim(),
    head_full_name: form.head_full_name?.trim(),
    agreement: form.agreement?.trim(),
    hire_count: Number(form.hire_count ?? 0)
  })
  emit('update:userCompanyFormVisible', false)
  $q.notify({ type: 'positive', message: 'Данные компании сохранены (mock)' })
}
</script>

<template>
  <q-dialog
    :model-value="userCompanyFormVisible"
    @update:model-value="v => emit('update:userCompanyFormVisible', !!v)"
  >
    <q-card style="min-width: 460px; max-width: 640px">
      <q-card-section class="text-h6">
        Редактирование данных о компании
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-7">
            <q-input
              v-model="form.name"
              label="Название компании"
              outlined dense
              :rules="[val => !!val || 'Название обязательно']"
            />
            <q-input
              v-model="form.area_of_activity"
              label="Направление деятельности"
              outlined dense
            />
            <q-input
              v-model="form.head_full_name"
              label="ФИО главы компании"
              outlined dense
            />
            <q-input
              v-model="form.agreement"
              label="Договор (№/дата)"
              outlined dense
              hint="Например: №42/2024 от 12.04.2024"
            />
            <q-input
              v-model.number="form.hire_count"
              type="number"
              label="Количество студентов"
              outlined dense
              :min="0"
            />
          </div>

          <div class="col-12 col-md-5">
            <q-input
              v-model="form.image_url"
              label="URL логотипа"
              outlined dense
              hint="Вставьте ссылку на изображение"
            />
            <div class="q-mt-sm">
              <q-img
                v-if="form.image_url"
                :src="form.image_url"
                ratio="16/9"
                class="q-rounded-md"
                :alt="'Логотип компании'"
                :error-src="''"
              />
              <div v-else class="bg-grey-3 q-pa-md q-rounded-md text-grey-7">
                Предпросмотр логотипа
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Отмена" @click="onCancel" />
        <q-btn color="primary" label="Сохранить" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
/* минимум кастомного CSS — всё на утилитах Quasar */
</style>

