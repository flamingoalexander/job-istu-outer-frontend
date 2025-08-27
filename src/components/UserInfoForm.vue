<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const props = defineProps<{
  userInfoFormVisible: boolean
  initial?: {
    email?: string
    first_name?: string
    last_name?: string
  }
}>()

const emit = defineEmits<{
  (e: 'update:userInfoFormVisible', value: boolean): void
  (e: 'confirm', patch: { email?: string; first_name?: string; last_name?: string }): void
}>()

/** локальная копия формы — заполняется из props.initial, чтобы не мутировать родителя до подтверждения */
const form = reactive({
  email: '',
  first_name: '',
  last_name: ''
})

watch(
  () => props.userInfoFormVisible,
  (v) => {
    if (v) {
      // при каждом открытии подменяем значениями из initial (или пустыми)
      form.email = props.initial?.email ?? ''
      form.first_name = props.initial?.first_name ?? ''
      form.last_name = props.initial?.last_name ?? ''
    }
  },
  { immediate: true }
)

function onCancel() {
  emit('update:userInfoFormVisible', false)
}

function onConfirm() {
  // имитация валидации
  if (!form.email?.trim()) {
    $q.notify({ type: 'warning', message: 'Укажите почту' })
    return
  }
  emit('confirm', {
    email: form.email.trim(),
    first_name: form.first_name.trim(),
    last_name: form.last_name.trim()
  })
  emit('update:userInfoFormVisible', false)
  $q.notify({ type: 'positive', message: 'Данные сохранены (mock)' })
}
</script>

<template>
  <q-dialog :model-value="userInfoFormVisible" @update:model-value="v => emit('update:userInfoFormVisible', !!v)">
    <q-card style="min-width: 420px; max-width: 520px">
      <q-card-section class="text-h6">Редактирование данных пользователя</q-card-section>
      <q-separator />
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.email" label="Почта" type="email" outlined dense />
        <q-input v-model="form.first_name" label="Имя" outlined dense />
        <q-input v-model="form.last_name" label="Фамилия" outlined dense />
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
/* без лишнего CSS */
</style>
