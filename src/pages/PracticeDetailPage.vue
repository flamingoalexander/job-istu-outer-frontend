<template>
  <q-page class="q-pa-lg bg-grey-2">
    <div class="row q-col-gutter-xl">
      <!-- Левый столбец (70%) -->
      <div class="col-12 col-md-8">
        <!-- Заголовок -->
        <div class="text-h3 text-weight-bold q-mb-lg text-black">
          {{ practiceData.title }}
        </div>

        <!-- Кнопки О практике и Участники -->
        <div class="row q-pa-md">
          <div class="col-12">
            <div class="row items-center">
              <q-btn
                color="blue"
                unelevated
                no-caps
                label="О практике"
                class="text-weight-bold bg-white text-primary q-mr-md"
              />
              <q-btn
                color="blue"
                unelevated
                no-caps
                label="Участники"
                class="text-weight-bold bg-white text-primary"
              />
            </div>
          </div>
        </div>

        <!-- Общий блок для кнопки, описания и навыков -->
        <div class="primary-background rounded-borders shadow-1">
          <!-- Кнопка Подать заявку -->
          <div class="row q-px-md q-pb-md">
            <div class="col-12">
              <q-btn
                color="black"
                unelevated
                no-caps
                label="Подать заявку"
                class="text-weight-bold bg-white text-primary"
                size="1.1em"
              />
            </div>
          </div>

          <!-- Описание -->
          <div class="q-pa-lg q-pt-none">
            <div class="text-h6 q-mb-md text-weight-medium text-white">Описание:</div>
            <p class="text-body1 line-height-2 text-white">
              {{ practiceData.description }}
            </p>
          </div>

          <!-- Специальности и навыки В СИНЕМ БЛОКЕ -->
          <div class="row q-col-gutter-lg q-pa-lg q-pt-none">
            <div class="col-12 col-md-6">
              <div class="text-h6 q-mb-md text-weight-medium text-white">Специальности:</div>
              <!-- СЕРЫЙ ФОН ДО КОНЦА БЛОКА -->
              <div class="bg-grey-5 q-pa-md rounded-borders" style="min-height: 120px">
                <div class="q-gutter-sm">
                  <q-chip
                    v-for="specialty in practiceData.specialties"
                    :key="specialty"
                    color="white"
                    text-color="primary"
                    class="text-weight-medium"
                  >
                    {{ specialty }}
                  </q-chip>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="text-h6 q-mb-md text-weight-medium text-white">Навыки:</div>
              <!-- СЕРЫЙ ФОН ДО КОНЦА БЛОКА -->
              <div class="bg-grey-5 q-pa-md rounded-borders" style="min-height: 120px">
                <div class="q-gutter-sm">
                  <q-chip
                    v-for="skill in practiceData.skills"
                    :key="skill"
                    color="white"
                    text-color="primary"
                    class="text-weight-medium"
                  >
                    {{ skill }}
                  </q-chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Правый столбец (30%) -->
      <div class="col-12 col-md-4">
        <!-- Компания с лого -->
        <div class="primary-background q-pa-lg rounded-borders shadow-1 q-mb-lg">
          <div class="column items-center text-center">
            <q-avatar size="80px" class="bg-white q-mb-md">
              <q-icon size="40px" color="primary" />
            </q-avatar>
            <div class="text-h5 text-weight-bold text-white">{{ practiceData.company }}</div>
          </div>
        </div>

        <!-- Заголовок Контакты -->
        <div class="text-h6 text-weight-medium text-black q-mb-md">Контакты:</div>

        <!-- Блок контактов -->
        <div class="primary-background q-pa-lg rounded-borders shadow-1">
          <div class="q-gutter-y-lg">
            <div
              v-for="(contact, index) in practiceData.contacts"
              :key="index"
              class="contact-item"
            >
              <div class="text-weight-bold text-subtitle1 text-white">{{ contact.name }}</div>
              <div class="text-white q-mb-xs">{{ contact.position }}</div>
              <div class="text-white">
                <div>Telegram: {{ contact.telegram }}</div>
                <div>Почта: {{ contact.email }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// Заглушки данных (в будущем будут приходить с бэкенда)
const practiceData = {
  title: 'Разработка микросервиса на Fast API',
  description:
    'Повседневная практика показывает, что рамки и место обучения кадров представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке дальнейших направлений развития. Повседневная практика показывает, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании форм развития.',
  specialties: ['ИСиС', 'АСУ', 'ЭВМБ', 'ИБС'],
  skills: ['FastAPI', 'Python', 'SQL'],
  company: 'ООО "Рога и копыта"',
  contacts: [
    {
      name: 'Гуськова Марина Ивановна',
      position: 'Заместитель по неважным вопросам',
      telegram: '@goose001',
      email: 'goooooes@gmail.com',
    },
    {
      name: 'Гуськова Марина Ивановna',
      position: 'Заместитель по неважным вопросам',
      telegram: '@goose001',
      email: 'goooooes@gmail.com',
    },
  ],
};
</script>

<style scoped>
.line-height-2 {
  line-height: 1.6;
}

.contact-item {
  border-left: 3px solid white;
  padding-left: 16px;
}

.primary-background {
  background: linear-gradient(135deg, #1976d2, #1565c0);
}

.bg-grey-2 {
  background-color: #f5f5f5;
}
</style>
