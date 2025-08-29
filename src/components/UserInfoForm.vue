<script setup lang="ts">
import { reactive, watch } from 'vue';
import type { UserInfoBaseInput } from 'src/api/user';

const props = defineProps<{
  userInfoFormVisible: boolean;
  initial?: {
    email?: string;
    first_name?: string;
    last_name?: string;
  };
}>();

const emit = defineEmits<{
  (e: 'update:userInfoFormVisible', value: boolean): void;
  (e: 'confirm', patch: UserInfoBaseInput): void;
}>();

const form = reactive({
  email: '',
  firstName: '',
  lastName: '',
});

watch(
  () => props.userInfoFormVisible,
  (v) => {
    if (v) {
      form.email = props.initial?.email ?? '';
      form.firstName = props.initial?.first_name ?? '';
      form.lastName = props.initial?.last_name ?? '';
    }
  },
  { immediate: true },
);

function onCancel() {
  emit('update:userInfoFormVisible', false);
}

function onConfirm() {
  emit('confirm', {
    email: form.email.trim(),
    first_name: form.firstName.trim(),
    last_name: form.lastName.trim(),
  });
  emit('update:userInfoFormVisible', false);
}
</script>

<template>
  <q-dialog
    :model-value="userInfoFormVisible"
    @update:model-value="(v) => emit('update:userInfoFormVisible', !!v)"
  >
    <q-card style="min-width: 420px; max-width: 520px">
      <q-card-section class="text-h6">Редактирование данных пользователя</q-card-section>
      <q-separator />
      <q-card-section class="q-gutter-md">
        <q-input v-model="form.email" label="Почта" type="email" outlined dense />
        <q-input v-model="form.firstName" label="Имя" outlined dense />
        <q-input v-model="form.lastName" label="Фамилия" outlined dense />
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn flat label="Отмена" @click="onCancel" />
        <q-btn color="primary" label="Сохранить" @click="onConfirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
