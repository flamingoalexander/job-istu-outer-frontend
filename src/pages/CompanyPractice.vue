<script setup lang="ts">
import { ref, onMounted } from 'vue';
const activeTab = ref('about');
import {
  getContacts,
  getInternshipData,
  getCandidates,
  approveRequest,
  declineRequest,
  closeInternship,
} from '../api/companies/index';
import type { Contact, Internship, Candidate } from '../api/companies/index';

const candidates = ref<Candidate[]>([]);
const contacts = ref<Contact[]>([]);
const internship_data = ref<Internship>();

onMounted(async () => {
  const contactsResponse = await getContacts();
  contacts.value = contactsResponse.value;
  const candidatesResponse = await getCandidates();
  candidates.value = candidatesResponse.value;
  const internshipResponse = await getInternshipData();
  internship_data.value = internshipResponse.value;
});
</script>

<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-9">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-h5 q-mb-md text-center">{{ internship_data?.title }}</div>
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
                <p>{{ internship_data?.description }}</p>
              </q-tab-panel>

              <q-tab-panel name="participants">
                <div class="text-h6">Участники</div>
                <q-list bordered separator>
                  <template v-for="candidate_item in candidates" :key="candidate_item.id">
                    <q-item v-if="candidate_item.status === 1">
                      <q-item-section>
                        {{ candidate_item.student_name }}
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="applications">
                <div class="text-h6">Заявки</div>
                <q-list bordered separator>
                  <template v-for="candidate_item in candidates" :key="candidate_item.id">
                    <q-item v-if="candidate_item.status != 1">
                      <q-item-section>
                        {{ candidate_item.student_name }}
                      </q-item-section>
                      <q-item-section side>
                        <div class="row q-gutter-sm">
                          <q-btn @click="approveRequest(candidate_item.id)"> Принять </q-btn>
                          <q-btn @click="declineRequest(candidate_item.id)"> Отклонить </q-btn>
                        </div>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>

            <div class="row items-center justify-between q-mt-md">
              <q-btn
                @click="closeInternship(internship_data?.id)"
                label="Закрыть набор"
                color="red"
                class="q-px-lg"
                unelevated
              />
              <q-btn label="Пригласить" color="primary" class="q-px-lg" unelevated />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div v-for="contactItem in contacts" :key="contactItem.id" class="col-3">
        <q-card>
          <q-card-section>
            <div class="flex justify-center">
              <q-avatar size="100px" color="primary" text-color="white">
                <q-icon name="person" size="40px" />
              </q-avatar>
            </div>
            <div class="text-h5 q-mt-md text-center">Контакты:</div>
            <div class="text-h5 q-mt-md text-center">{{ contactItem.full_name }}</div>
            <div class="text-h5 q-mt-md text-center">Телеграм:{{ contactItem.value }}</div>
            <div class="text-h5 q-mt-md text-center">Почта:{{ contactItem.value }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<styles>

</styles>
