<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useQuasar } from 'quasar';
import type { Credentials } from 'src/api/models/Credentials';
import authFormImage from '/pics/auth-form-preview.jpg';
import { useRouter } from 'vue-router';
import { useUserStore } from 'stores/user';

const $q = useQuasar();

const authMessage = ref('');
const store = useUserStore();

const credentials: Credentials = reactive({
  username: '',
  password: '',
});

const router = useRouter();
const loading = ref(false);

const isMobile = computed(() => $q.screen.lt.md);

const cardStyle = computed(() => ({
  maxWidth: isMobile.value ? '560px' : '1080px',
  width: '100%',
  borderRadius: '24px',
  overflow: 'hidden',
  background: 'white',
}));

const imageMinHeight = computed(() => (isMobile.value ? '220px' : '420px'));

const handleAuth = async (isEsia: boolean) => {
  try {
    if (isEsia) {
      store.loginEsia();
    } else {
      loading.value = true;
      await store.login(credentials);
    }
    await router.push('/');
  } catch {
    alert('Неизвестная ошибка');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-page class="bg-grey-2 flex flex-center q-pa-md">
    <q-card :style="cardStyle" flat bordered>
      <div class="row items-stretch">
        <!-- Картинка: показываем только на md+ (чтобы на телефоне не занимала полэкрана) -->
        <div class="col-12 col-md-6 gt-sm">
          <q-img
            :src="authFormImage"
            ratio="4/3"
            :style="{ height: '100%', minHeight: imageMinHeight }"
            img-class="object-cover"
          >
            <div class="absolute-top-left q-pa-lg text-dark text-weight-medium">
              <div class="text-h3 text-shadow" style="line-height: 1.05">
                Центр<br />
                Карьеры<br />
                ИРНИТУ
              </div>
            </div>
          </q-img>
        </div>

        <!-- Форма -->
        <div class="col-12 col-md-6 bg-white">
          <div class="q-pa-lg">
            <div :class="isMobile ? 'text-h5' : 'text-h4'" class="text-dark q-mb-md">
              Авторизация
            </div>

            <q-banner
              v-if="authMessage"
              inline-actions
              class="bg-red-6 text-white q-mb-md"
              style="border-radius: 12px"
            >
              {{ authMessage }}
            </q-banner>

            <q-form @submit.prevent="handleAuth(false)" class="q-gutter-md">
              <q-input
                v-model="credentials.username"
                label="Логин"
                autocomplete="username"
                outlined
                :dense="isMobile"
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
                :dense="isMobile"
                :disable="loading"
                prepend-inner-icon="lock"
              />

              <!-- Кнопки: на мобилке в столбик, на md+ можно в строку -->
              <div class="row q-col-gutter-sm q-mt-md">
                <div class="col-12 col-sm-6">
                  <q-btn
                    type="submit"
                    :loading="loading"
                    unelevated
                    color="primary"
                    class="full-width q-py-sm"
                    style="border-radius: 12px"
                  >
                    <div class="text-center">Производственный<br />партнер</div>
                  </q-btn>
                </div>

                <div class="col-12 col-sm-6">
                  <q-btn
                    @click="handleAuth(true)"
                    unelevated
                    class="full-width q-py-sm"
                    style="border-radius: 12px"
                    color="cyan-5"
                    label="ИРНИТУ"
                    :disable="loading"
                  />
                </div>
              </div>
            </q-form>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
.text-shadow {
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
}
</style>
