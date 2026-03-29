<script setup lang="ts">
import { ref } from 'vue';
const activeTab = ref('about');
import { useQuery } from '@tanstack/vue-query';
import { useQuasar } from 'quasar';
import {
  getContacts,
  getInternshipData,
  getCandidates,
  approveRequest,
  declineRequest,
  closeInternship,
} from 'src/api/companies';
import { useRoute } from 'vue-router';
const internshipId = Number(useRoute().params.id as string);
import type { Contact, Candidate } from 'src/api/companies';

const { data: contacts, isLoading: isContactsLoading } = useQuery<Contact[]>({
  queryKey: ['contacts'],
  queryFn: getContacts,
});

const { data: candidates, isLoading: isCandidatesLoading } = useQuery<Candidate[]>({
  queryKey: ['candidates'],
  queryFn: () => getCandidates(internshipId),
});

const { data: internshipData, isLoading: isInternshipLoading } = useQuery({
  queryKey: ['internship'],
  queryFn: () => getInternshipData(internshipId),
});
const $q = useQuasar();
const handleApprove = async (id: number) => {
  try {
    await approveRequest(id);
    $q.notify({
      type: 'positive',
      message: 'Заявка принята',
      position: 'bottom',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при принятии заявки',
      position: 'bottom',
    });
    console.error(error);
  }
};

const handleDecline = async (id: number) => {
  try {
    await declineRequest(id);
    $q.notify({
      type: 'warning',
      message: 'Заявка отклонена',
      position: 'bottom',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Ошибка при отклонении заявки',
      position: 'bottom',
    });
    console.error(error);
  }
};

const handleClosing = async () => {
  try {
    await closeInternship(internshipId);
    $q.notify({
      type: 'warning',
      message: 'Практика закрыта',
      position: 'bottom',
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Практика закрыта с ошибкой',
      position: 'bottom',
    });
    console.error(error);
  }
};
</script>

<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-9">
        <q-card flat bordered v-if="!isInternshipLoading">
          <q-card-section>
            <div class="text-h5 q-mb-md text-center">{{ internshipData?.theme }}</div>
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
                <p>{{ internshipData?.description }}</p>
              </q-tab-panel>

              <q-tab-panel name="participants" v-if="!isCandidatesLoading">
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
                <q-list v-if="!isCandidatesLoading" bordered separator>
                  <template v-for="candidate_item in candidates" :key="candidate_item.id">
                    <q-item v-if="candidate_item.status != 1">
                      <q-item-section>
                        {{ candidate_item.student_name }}
                      </q-item-section>
                      <q-item-section side>
                        <div class="row q-gutter-sm">
                          <q-btn @click="handleApprove(candidate_item.id)"> Принять </q-btn>
                          <q-btn @click="handleDecline(candidate_item.id)"> Отклонить </q-btn>
                        </div>
                      </q-item-section>
                    </q-item>
                  </template>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>

            <div class="row items-center justify-between q-mt-md">
              <q-btn
                @click="handleClosing"
                label="Закрыть набор"
                color="red"
                class="q-px-lg"
                unelevated
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-3" v-if="!isContactsLoading">
        <div class="text-h5 q-mt-md text-center">Контакты:</div>
        <div v-for="contactItem in contacts" :key="contactItem.id">
          <q-card>
            <q-card-section>
              <div class="flex justify-center">
                <q-avatar size="100px" color="primary" text-color="white">
                  <q-icon name="person" size="40px" />
                </q-avatar>
              </div>
              <div class="text-h5 q-mt-md text-center">{{ contactItem.full_name }}</div>
              <div class="text-h5 q-mt-md text-center">Телеграм:{{ contactItem.value }}</div>
              <div class="text-h5 q-mt-md text-center">Почта:{{ contactItem.value }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
