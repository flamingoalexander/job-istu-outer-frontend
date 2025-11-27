<template>
  <q-page class="q-pa-xl bg-grey-2 q-pt-none">
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="bg-grey-8 q-pa-xl text-black">
          <div class="text-h3 text-weight-bold q-mb-xl">
            {{ practiceData.title }}
          </div>

          <div class="row q-mb-xl bg-grey-1">
            <div class="col-12">
              <div class="row no-wrap">
                <q-btn
                  color="grey-9"
                  unelevated
                  no-caps
                  label="О практике"
                  text-color="white"
                  class="text-weight-bold"
                  style="min-height: 60px; border-radius: 0"
                />
                <q-btn
                  color="grey-4"
                  unelevated
                  no-caps
                  label="Участники"
                  text-color="black"
                  class="text-weight-bold"
                  style="min-height: 60px; border-radius: 0"
                />
              </div>
            </div>
          </div>

          <div class="bg-grey-8 q-pa-xl">
            <div class="row q-mb-lg">
              <div class="col-12">
                <q-btn
                  color="grey-3"
                  unelevated
                  no-caps
                  label="Подать заявку"
                  text-color="black"
                  class="text-weight-bold"
                  size="1.1em"
                  padding="12px 32px"
                />
              </div>
            </div>

            <div class="q-mb-xl">
              <div class="text-h5 q-mb-lg text-weight-medium text-white">Описание:</div>
              <p class="text-body1 text-white">
                {{ practiceData.description }}
              </p>
            </div>

            <div class="row q-col-gutter-xl">
              <div class="col-12 col-md-6">
                <div class="text-h5 q-mb-lg text-weight-medium text-white">Специальности:</div>
                <div class="bg-grey-4 q-pa-lg">
                  <div class="q-gutter-sm">
                    <q-chip
                      v-for="specialty in practiceData.specialties"
                      :key="specialty"
                      color="grey-8"
                      text-color="white"
                      class="text-weight-medium"
                    >
                      {{ specialty }}
                    </q-chip>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="text-h5 q-mb-lg text-weight-medium text-white">Навыки:</div>
                <div class="bg-grey-4 q-pa-lg">
                  <div class="q-gutter-sm">
                    <q-chip
                      v-for="skill in practiceData.skills"
                      :key="skill"
                      color="grey-8"
                      text-color="white"
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
      </div>

      <div class="col-12 col-md-4 q-pt-none no-top-padding">
        <div class="bg-grey-3 q-pa-xl q-pt-none no-top-padding">
          <div class="bg-grey-8 text-white q-pa-xl q-pt-none no-top-padding">
            <div class="column items-center text-center q-pt-lg">
              <q-avatar size="100px" class="bg-white q-mb-lg">
                <q-icon size="50px" color="grey-8" />
              </q-avatar>
              <div class="text-h4 text-weight-bold">{{ practiceData.company }}</div>
            </div>
          </div>

          <div class="text-h5 text-weight-medium q-mb-lg text-grey-9">Контакты:</div>

          <div class="bg-grey-8 text-white q-pa-xl">
            <div class="q-gutter-y-xl">
              <div
                v-for="(contact, index) in practiceData.contacts"
                :key="index"
                class="contact-item"
              >
                <div class="text-weight-bold text-h6">{{ contact.name }}</div>
                <div class="text-caption text-grey-3 q-mb-sm">{{ contact.position }}</div>
                <div class="text-caption text-grey-3">
                  <div>Telegram: {{ contact.telegram }}</div>
                  <div>Почта: {{ contact.email }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
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
.no-top-padding {
  padding-top: 0 !important;
  margin-top: 0 !important;
}
</style>
