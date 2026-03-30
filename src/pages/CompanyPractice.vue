<script setup lang="ts">
import { ref, computed } from 'vue';
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
import type { Contact, Candidate } from 'src/api/companies';

const activeTab = ref('about');

const internshipId = Number(useRoute().params.id as string);
const $q = useQuasar();

const isMobile = computed(() => $q.screen.lt.md);

const pagePadding = computed(() =>
  $q.screen.lt.sm ? 'q-pa-md' : $q.screen.lt.md ? 'q-pa-lg' : 'q-pa-xl',
);

const btnStackClass = computed(() => (isMobile.value ? 'column items-stretch' : 'row'));
const btnFullWidth = computed(() => (isMobile.value ? 'full-width' : ''));

const { data: contacts, isLoading: isContactsLoading } = useQuery<Contact[]>({
  queryKey: ['contacts'],
  queryFn: getContacts,
});

const { data: candidates, isLoading: isCandidatesLoading } = useQuery<Candidate[]>({
  queryKey: ['candidates', internshipId],
  queryFn: () => getCandidates(internshipId),
});

const { data: internshipData, isLoading: isInternshipLoading } = useQuery({
  queryKey: ['internship', internshipId],
  queryFn: () => getInternshipData(internshipId),
});

const handleApprove = async (id: number) => {
  try {
    await approveRequest(id);
    $q.notify({ type: 'positive', message: 'Заявка принята', position: 'bottom' });
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Ошибка при принятии заявки', position: 'bottom' });
    console.error(error);
  }
};

const handleDecline = async (id: number) => {
  try {
    await declineRequest(id);
    $q.notify({ type: 'warning', message: 'Заявка отклонена', position: 'bottom' });
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Ошибка при отклонении заявки', position: 'bottom' });
    console.error(error);
  }
};

const handleClosing = async () => {
  try {
    await closeInternship(internshipId);
    $q.notify({ type: 'warning', message: 'Практика закрыта', position: 'bottom' });
  } catch (error) {
    $q.notify({ type: 'negative', message: 'Практика закрыта с ошибкой', position: 'bottom' });
    console.error(error);
  }
};
</script>

<template>
  <q-page :class="pagePadding">
    <div class="row justify-center">
      <div class="col-12 col-md-10 col-lg-9">
        <div class="row q-col-gutter-md">
          <!-- Основной блок -->
          <div class="col-12 col-md-8">
            <q-card flat bordered v-if="!isInternshipLoading">
              <q-card-section>
                <div :class="isMobile ? 'text-h6' : 'text-h5'" class="q-mb-md text-center">
                  {{ internshipData?.theme }}
                </div>

                <q-tabs
                  v-model="activeTab"
                  dense
                  class="text-grey"
                  active-color="primary"
                  indicator-color="primary"
                  align="left"
                  narrow-indicator
                  :outside-arrows="isMobile"
                  :mobile-arrows="isMobile"
                >
                  <q-tab name="about" label="О практике" />
                  <q-tab name="participants" label="Участники" />
                  <q-tab name="applications" label="Заявки" />
                </q-tabs>

                <q-separator class="q-my-sm" />

                <q-tab-panels v-model="activeTab" animated>
                  <q-tab-panel name="about">
                    <div class="text-h6">О практике</div>
                    <div class="text-body2 q-mt-sm">
                      {{ internshipData?.description }}
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="participants" v-if="!isCandidatesLoading">
                    <div class="text-h6">Участники</div>
                    <q-list bordered separator class="q-mt-sm">
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

                    <q-list v-if="!isCandidatesLoading" bordered separator class="q-mt-sm">
                      <template v-for="candidate_item in candidates" :key="candidate_item.id">
                        <q-item v-if="candidate_item.status != 1">
                          <q-item-section>
                            {{ candidate_item.student_name }}
                          </q-item-section>

                          <!-- На мобилке: кнопки переходят вниз -->
                          <q-item-section
                            :side="!isMobile"
                            class="q-mt-sm"
                            :class="isMobile ? '' : 'text-right'"
                          >
                            <div :class="btnStackClass" class="q-gutter-sm">
                              <q-btn
                                color="positive"
                                unelevated
                                label="Принять"
                                :class="btnFullWidth"
                                @click="handleApprove(candidate_item.id)"
                              />
                              <q-btn
                                color="negative"
                                unelevated
                                label="Отклонить"
                                :class="btnFullWidth"
                                @click="handleDecline(candidate_item.id)"
                              />
                            </div>
                          </q-item-section>
                        </q-item>
                      </template>
                    </q-list>
                  </q-tab-panel>
                </q-tab-panels>

                <q-separator class="q-my-md" />

                <q-btn
                  @click="handleClosing"
                  label="Закрыть набор"
                  color="red"
                  unelevated
                  :class="isMobile ? 'full-width' : ''"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Контакты: справа на md+, снизу на мобилке -->
          <div class="col-12 col-md-4" v-if="!isContactsLoading">
            <!-- На мобилке можно свернуть в аккордеон -->
            <q-expansion-item
              class="lt-md"
              icon="contacts"
              label="Контакты"
              header-class="text-weight-medium"
              default-opened
            >
              <div class="q-pt-sm column q-gutter-md">
                <q-card v-for="contactItem in contacts" :key="contactItem.id" flat bordered>
                  <q-card-section>
                    <div class="flex justify-center">
                      <q-avatar size="72px" color="primary" text-color="white">
                        <q-icon name="person" size="32px" />
                      </q-avatar>
                    </div>

                    <div class="text-subtitle1 q-mt-sm text-center">
                      {{ contactItem.full_name }}
                    </div>

                    <div class="text-body2 q-mt-sm text-center">
                      Telegram: {{ contactItem.value }}
                    </div>
                    <div class="text-body2 q-mt-xs text-center">Почта: {{ contactItem.value }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </q-expansion-item>

            <!-- На десктопе обычный список -->
            <div class="gt-sm">
              <div class="text-h6 q-mb-sm text-center">Контакты</div>
              <div class="column q-gutter-md">
                <q-card v-for="contactItem in contacts" :key="contactItem.id" flat bordered>
                  <q-card-section>
                    <div class="flex justify-center">
                      <q-avatar size="84px" color="primary" text-color="white">
                        <q-icon name="person" size="36px" />
                      </q-avatar>
                    </div>

                    <div class="text-subtitle1 q-mt-sm text-center">
                      {{ contactItem.full_name }}
                    </div>

                    <div class="text-body2 q-mt-sm text-center">
                      Telegram: {{ contactItem.value }}
                    </div>
                    <div class="text-body2 q-mt-xs text-center">Почта: {{ contactItem.value }}</div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </div>
          <!-- /контакты -->
        </div>
      </div>
    </div>
  </q-page>
</template>
