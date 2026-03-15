<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('about') 
</script>

<template>
  <div class="q-pa-md">
    <div class="row">
       <div class="col-9">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h5 q-mb-md text-center">ТЫРЫРЫРЫ КАКАЯ-ТО ПРАКТИКА</div>
            <q-tabs
              v-model="activeTab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="about" label="О практике" />
              <q-tab name="participants" label="Участники" />
              <q-tab name="applications" label="Заявки" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="activeTab" animated>
              <q-tab-panel name="about">
                <div class="text-h6">О практике</div>
                <p>ВЫ БУДЕТЕ ГОНЯТЬ ЧАИ В ОФИСЕ И ТЫКАТЬ КНОПКИ</p>
              </q-tab-panel>

              <q-tab-panel name="participants">
                <div class="text-h6">Участники</div>
                <q-list bordered separator>
                  <q-item>
                    <q-item-section>Иван Иванов</q-item-section>
                    <q-item-section side>Активен</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Петр Петров</q-item-section>
                    <q-item-section side>Активен</q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="applications">
                <div class="text-h6">Заявки</div>
                <q-list bordered separator>
                  <q-item>
                    <q-item-section>АННА СМИРНОВА ХОЧЕТ РАБОТАТЬ</q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>

            <div class="row items-center justify-between q-mt-md">
              <q-btn label="Закрыть набор" color="red" class="q-px-lg" unelevated />
              <q-btn label="Пригласить" color="primary" class="q-px-lg" unelevated />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3">
        <q-card>
          <q-card-section>
            <q-avatar size="100px" color="primary" text-color="white">
              <q-icon name="person" size="40px" />
            </q-avatar>
            <div class="text-h5 q-mt-md text-center">Контакты:</div>
            <div class="text-h5 q-mt-md text-center">ФИО</div>
            <div class="text-h5 q-mt-md text-center">Телеграм:</div>
            <div class="text-h5 q-mt-md text-center">Почта:</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<styles>

</styles>
