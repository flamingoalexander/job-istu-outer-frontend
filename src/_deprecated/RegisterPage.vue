<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg q-ma-md" flat bordered>
      <q-card-section>
        <div class="text-h6 text-primary text-center">
          Для регистрации вашей компании необходимо отправить заполненную версию документа на адрес
          <q-btn :href="emailLink" flat color="primary" label="job@istu.ru" icon="email" />
        </div>
      </q-card-section>

      <q-separator spaced />

      <q-card-actions vertical align="center">
        <q-btn
          href="https://job.istu.edu/out/templates/long_agreement2023.docx"
          outline
          color="primary"
          label="Долгосрочный договор"
          icon="description"
        />
        <q-btn
          href="https://job.istu.edu/out/templates/short_agreement2023.docx"
          outline
          color="primary"
          label="Индивидуальный договор"
          icon="description"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
const emailLink =
  'mailto:job@istu.edu?subject=Регистрация компании&body=Заполненная версия документа';
</script>
