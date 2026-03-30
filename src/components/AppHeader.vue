<template>
  <q-header elevated>
    <q-toolbar>
      <!-- Лого -->
      <q-btn flat round dense :to="{ path: '/' }" aria-label="На главную" class="q-mr-sm">
        <q-avatar size="42px">
          <q-img
            src="https://www.istu.edu/upload/iblock/f55/logo_1.png"
            alt="ИРНИТУ"
            ratio="1"
            spinner-color="primary"
            loading="lazy"
          />
        </q-avatar>
      </q-btn>

      <!-- Заголовок -->
      <div class="text-subtitle1 text-weight-medium ellipsis">
        Производственные партнёры<br class="lt-md" />
        институтов ИРНИТУ
      </div>

      <q-space />

      <!-- Статусы (показываем только на md+) -->
      <div class="gt-sm row items-center q-gutter-lg q-ml-md no-wrap">
        <div class="text-subtitle2 text-weight-medium ellipsis text-red-4">
          Ваша роль: {{ isEmpty(store.roles) ? 'Роли отсутствуют' : store.roles }}
        </div>
        <div class="text-subtitle2 text-weight-medium ellipsis text-yellow-4">
          Статус: {{ store.isAuthenticated ? 'Авторизован' : 'Не авторизован' }}
        </div>
      </div>

      <!-- Десктоп действия (md+) -->
      <div class="gt-sm row items-center no-wrap q-ml-md">
        <q-btn
          color="primary"
          unelevated
          no-caps
          class="q-mr-sm"
          label="Выйти"
          @click="store.logout"
        />
        <q-btn
          color="primary"
          unelevated
          no-caps
          class="q-mr-sm"
          :to="{ name: 'register' }"
          label="Договор"
        />

        <q-btn
          round
          flat
          type="a"
          href="https://t.me/ForStudentIRNITUbot"
          target="_blank"
          rel="noopener"
          aria-label="Открыть Telegram-бота"
        >
          <q-avatar size="36px">
            <q-img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/1200px-Telegram_logo.svg.png"
              alt="Telegram"
              ratio="1"
              loading="lazy"
            />
          </q-avatar>
        </q-btn>

        <q-btn round flat :to="{ name: 'login' }" aria-label="Войти">
          <q-avatar size="36px">
            <q-img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALBplMxySL51Y_dJZ5FTrLpa1rpD72FebJA&usqp=CAU"
              alt="Профиль"
              ratio="1"
              loading="lazy"
            />
          </q-avatar>
        </q-btn>
      </div>

      <!-- Мобилка: бургер-меню (lt-md) -->
      <q-btn class="lt-md q-ml-sm" flat round dense icon="menu" aria-label="Меню">
        <q-menu anchor="bottom right" self="top right">
          <q-list style="min-width: 260px">
            <q-item>
              <q-item-section>
                <div class="text-body2 text-red-4">
                  Ваша роль: {{ isEmpty(store.roles) ? 'Роли отсутствуют' : store.roles }}
                </div>
                <div class="text-body2 text-yellow-4 q-mt-xs">
                  Статус: {{ store.isAuthenticated ? 'Авторизован' : 'Не авторизован' }}
                </div>
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-close-popup @click="store.logout">
              <q-item-section avatar><q-icon name="logout" /></q-item-section>
              <q-item-section>Выйти</q-item-section>
            </q-item>

            <q-item clickable v-close-popup :to="{ name: 'register' }">
              <q-item-section avatar><q-icon name="description" /></q-item-section>
              <q-item-section>Договор</q-item-section>
            </q-item>

            <q-item
              clickable
              v-close-popup
              tag="a"
              href="https://t.me/ForStudentIRNITUbot"
              target="_blank"
              rel="noopener"
            >
              <q-item-section avatar><q-icon name="send" /></q-item-section>
              <q-item-section>Telegram-бот</q-item-section>
            </q-item>

            <q-item clickable v-close-popup :to="{ name: 'login' }">
              <q-item-section avatar><q-icon name="person" /></q-item-section>
              <q-item-section>Профиль / Войти</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/user';
import { isEmpty } from 'lodash';

const store = useUserStore();
</script>
