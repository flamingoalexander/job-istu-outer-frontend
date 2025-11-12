<template>
  <q-header elevated>
    <q-toolbar>
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
      <div class="text-subtitle1 text-weight-medium ellipsis">
        Производственные партнёры<br class="lt-md" />
        институтов ИРНИТУ
      </div>

      <q-space />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'register' }"
        label="Практики (Student-Screen-1)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'register' }"
        label="Конкретная практика (Student-Screen-1.1)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'register' }"
        label="Компании (Student-Screen-2)"
      />
      <q-btn
        color="primary"
        unelevated
        no-caps
        class="q-mr-sm"
        :to="{ name: 'practice-form' }"
        label="Форма создания практики (Company-Screen-1.1)"
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
      <q-btn round flat :to="{ name: 'profile' }" aria-label="Войти">
        <q-avatar size="36px">
          <q-img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRALBplMxySL51Y_dJZ5FTrLpa1rpD72FebJA&usqp=CAU"
            alt="Профиль"
            ratio="1"
            loading="lazy"
          />
        </q-avatar>
      </q-btn>
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts"></script>

<style scoped></style>
