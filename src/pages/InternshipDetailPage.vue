<template>
  <q-page class="q-pa-xl bg-grey-2 q-pt-none">
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="bg-grey-8 q-pa-xl text-black">
          <div class="text-h3 text-weight-bold q-mb-xl">
            {{ internshipData.title }}
          </div>

          <div class="row q-mb-xl bg-grey-1">
            <div class="col-12">
              <q-tabs
                v-model="activeTab"
                dense
                class="full-width"
                active-color="grey-9"
                indicator-color="grey-9"
                align="left"
                narrow-indicator
              >
                <q-tab name="about" label="О стажировке" />
                <q-tab name="members" label="Участники" />
              </q-tabs>
            </div>
          </div>

          <div v-if="activeTab === 'about'" class="bg-grey-8 q-pa-xl">
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
                {{ internshipData.description }}
              </p>
            </div>

            <div class="row q-col-gutter-xl">
              <div class="col-12 col-md-6">
                <div class="text-h5 q-mb-lg text-weight-medium text-white">Специальности:</div>
                <div class="bg-grey-4 q-pa-lg">
                  <div class="q-gutter-sm">
                    <q-chip
                      v-for="specialty in internshipData.specialties"
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
                      v-for="skill in internshipData.skills"
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

          <div v-if="activeTab === 'members'" class="bg-grey-8 q-pa-xl">
            <MembersList :members="members" />
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4 q-pt-none">
        <div class="bg-grey-3 q-pa-xl">
          <CompanyInfo :company="internshipData.company" :contacts="internshipData.contacts" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CompanyInfo from 'components/internship-detail/CompanyInfo.vue';
import MembersList from 'components/internship-detail/MembersList.vue';

const activeTab = ref('about');

type Member = {
  id: number;
  studentName: string;
};

const internshipData = {
  title: 'Разработка микросервиса на Fast API',
  description:
    'Повседневная практика показывает, что рамки и место обучения кадров представляет собой интересный эксперимент проверки системы обучения кадров, соответствует насущным потребностям. Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет выполнять важные задания по разработке дальнейших направлений развития.',
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

const members = ref<Member[]>([
  { id: 1, studentName: 'Иванов Иван Иванович' },
  { id: 2, studentName: 'Иванов Иван Иванович' },
  { id: 3, studentName: 'Иванов Иван Иванович' },
  { id: 4, studentName: 'Иванов Иван Иванович' },
  { id: 5, studentName: 'Иванов Иван Иванович' },
]);
</script>
