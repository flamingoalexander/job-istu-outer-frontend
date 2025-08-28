<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { Credentials } from 'src/types/auth';
import authFormImage from '/pics/auth-form-preview.jpg';
const isDisabled = ref(false);
const authMessage = ref('');
import { useUserStore } from 'stores/user';
import { useRouter } from 'vue-router';

const credentials: Credentials = reactive({
  username: '',
  password: '',
  rememberMe: false,
});
const router = useRouter();
const loading = ref(false);
const userStore = useUserStore();
const handleAuth = async () => {
  loading.value = true;
  try {
    await userStore.login(credentials);
    await router.push('/profile');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-page class="bg-grey-2 flex flex-center q-pa-md">
    <div class="auth-card q-pa-none q-mx-auto">
      <div class="row items-stretch no-wrap">
        <div class="col-12 col-md-6">
          <q-img
            :src="authFormImage"
            ratio="4/3"
            class="full-height radius-left"
            :img-class="'object-cover'"
          >
            <div
              class="absolute-top-left q-pa-lg text-dark text-weight-medium text-h2 text-shadow-2"
            >
              Центр<br />
              Карьеры <br />
              ИРНИТУ
            </div>
          </q-img>
        </div>

        <div class="col-12 col-md-6 bg-white radius-right flex column">
          <div class="q-pa-lg">
            <div class="text-h4 text-dark q-mb-md">Авторизация</div>

            <q-banner
              v-if="authMessage"
              inline-actions
              class="bg-red-6 text-white q-mb-md radius-md"
            >
              {{ authMessage }}
            </q-banner>

            <q-form @submit.prevent="handleAuth" class="q-gutter-md">
              <q-input
                v-model="credentials.username"
                label="Логин"
                autocomplete="username"
                outlined
                dense
                clearable
                :disable="loading"
                prepend-inner-icon="person"
              />

              <q-input
                v-model="credentials.password"
                type="password"
                label="Пароль"
                autocomplete="current-password"
                outlined
                dense
                :disable="loading"
                prepend-inner-icon="lock"
              />

              <div class="row items-center">
                <div class="col">
                  <q-checkbox
                    v-model="credentials.rememberMe"
                    :disable="isDisabled || loading"
                    label="Запомнить меня"
                    dense
                  />
                </div>
              </div>

              <div class="row items-center q-mt-lg">
                <q-btn
                  type="submit"
                  :loading="loading"
                  unelevated
                  color="primary"
                  class="full-width q-py-sm radius-md"
                >
                  <div class="text-center">Производственный<br />партнер</div>
                </q-btn>
                <q-btn
                  href="https://job.istu.edu/inner"
                  target="_blank"
                  unelevated
                  class="full-width q-py-sm radius-md"
                  color="cyan-5"
                  label="ИРНИТУ"
                />
              </div>
            </q-form>
          </div>
          <div class="q-mt-auto" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.auth-card {
  max-width: 1080px;
  width: 100%;
  border-radius: 24px;
  background: white;
  overflow: hidden;
}

.radius-left {
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
}
.radius-right {
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
}

@media (max-width: 1023px) {
  .radius-left,
  .radius-right {
    border-radius: 0 !important;
  }
  .auth-card {
    border-radius: 24px;
  }
}

.text-shadow-2 {
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
}

.full-height {
  height: 100%;
  min-height: 420px;
}
</style>
