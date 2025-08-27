<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useQuasar, Loading, QSpinner } from 'quasar'
import UserInfoForm from 'src/components/UserInfoForm.vue'
import CompanyInfoForm from 'src/CompanyInfoForm.vue';

const $q = useQuasar()

/** ======= Моки/заглушки данных ======= */
const user = reactive({
  username: 'partner_123',
  email: 'partner@example.com',
  first_name: 'Иван',
  last_name: 'Петров'
})

const company = reactive({
  image_url: 'https://cdn.quasar.dev/img/parallax1.jpg',
  name: 'ООО «ТехноПрогресс»',
  area_of_activity: 'Разработка ПО и интеграция',
  head_full_name: 'Сидоров Максим Сергеевич',
  agreement: '№42/2024 от 12.04.2024',
  hire_count: 7
})

/** Темы — три типа: ПР, ВКР, НИОКР */
const themes = ref([
  { id: 1, title: 'ML для предсказания отказов', type: 'ПР' },
  { id: 2, title: 'Сервис аналитики логов', type: 'ПР' },
  { id: 3, title: 'Маршрутизация заявок — диплом', type: 'ВКР' },
  { id: 4, title: 'Система рекомендаций НИОКР', type: 'НИОКР' }
])

const practiceThemes = computed(() => themes.value.filter(t => t.type === 'ПР'))
const vkrThemes      = computed(() => themes.value.filter(t => t.type === 'ВКР'))
const niokrThemes    = computed(() => themes.value.filter(t => t.type === 'НИОКР'))

/** Институты (для диалога добавления практики) */
const institutes = ref([
  { id: 10, name: 'ИИТИАД' },
  { id: 11, name: 'ГИ' },
  { id: 12, name: 'Энергетический институт' }
])

/** ======= Состояние UI ======= */
const userInfoFormVisible = ref(false)

const practiceThemeInputVisible = ref(false)
const vkrThemeInputVisible = ref(false)
const niokrThemeInputVisible = ref(false)
const inputThemeValue = ref('')

const addPracticeFormVisible = ref(false)
const practiceForm = reactive({
  themes: [] as number[],
  faculty: null as number | null
})

/** ======= Хелперы ======= */
async function withLoading<T>(fn: () => Promise<T>) {
  Loading.show({ spinner: QSpinner })
  try { return await fn() } finally { Loading.hide() }
}

function removeTheme(themeId: number) {
  themes.value = themes.value.filter(t => t.id !== themeId)
  $q.notify({ type: 'positive', message: 'Тема удалена' })
}

function addTheme(kind: 'ПР' | 'ВКР' | 'НИОКР') {
  const title = inputThemeValue.value?.trim()
  if (!title) {
    // закроем поля ввода, если пусто
    practiceThemeInputVisible.value = false
    vkrThemeInputVisible.value = false
    niokrThemeInputVisible.value = false
    return
  }
  const newId = Math.max(0, ...themes.value.map(t => t.id)) + 1
  themes.value.push({ id: newId, title, type: kind })
  inputThemeValue.value = ''
  practiceThemeInputVisible.value = false
  vkrThemeInputVisible.value = false
  niokrThemeInputVisible.value = false
  $q.notify({ type: 'positive', message: 'Тема добавлена' })
}

function onConfirmAddPractice() {
  // простая имитация сохранения
  if (!practiceForm.themes.length || !practiceForm.faculty) {
    $q.notify({ type: 'warning', message: 'Заполните темы и институт' })
    return
  }
  addPracticeFormVisible.value = false
  $q.notify({ type: 'positive', message: 'Практика добавлена (mock)' })
  practiceForm.themes = []
  practiceForm.faculty = null
}

function logOut() {
  $q.notify({ type: 'info', message: 'Выход (mock)' })
}

/** обновление данных пользователя из модалки */
function applyUserPatch(patch: Partial<typeof user>) {
  Object.assign(user, patch)
  $q.notify({ type: 'positive', message: 'Профиль обновлён (mock)' })
}
</script>

<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row justify-center">
      <div class="col-12 col-lg-10 col-xl-8">
        <q-card flat bordered class="q-pa-lg q-rounded-xl">

          <div class="row items-center justify-between q-mb-md">
            <div class="text-h5">Личный кабинет предприятия</div>
            <q-btn
              round color="primary" icon="edit" aria-label="Редактировать пользователя"
              @click="userInfoFormVisible = true"
            />
          </div>

          <!-- Пользователь -->
          <div class="row q-col-gutter-lg q-mb-lg">
            <div class="col-12 col-md-6">
              <div class="q-mb-md">
                <div class="text-caption text-grey-7 q-mb-xs">Логин</div>
                <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ user.username || 'Данные не заданы' }}</div>
              </div>
              <div>
                <div class="text-caption text-grey-7 q-mb-xs">Контакты</div>
                <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ user.email || 'Данные не заданы' }}</div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="q-mb-md">
                <div class="text-caption text-grey-7 q-mb-xs">Имя</div>
                <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ user.first_name || 'Данные не заданы' }}</div>
              </div>
              <div>
                <div class="text-caption text-grey-7 q-mb-xs">Фамилия</div>
                <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ user.last_name || 'Данные не заданы' }}</div>
              </div>
            </div>
          </div>

          <q-separator spaced />

          <!-- Компания -->
          <div class="q-mb-lg">
            <div class="row items-center justify-between q-mb-md">
              <div class="text-h6">Информация о компании</div>
              <q-btn round color="primary" icon="business" aria-label="Редактировать компанию (mock)" @click="$q.notify({message:'Откроется форма компании (mock)', type:'info'})" />
            </div>

            <div class="row q-col-gutter-lg">
              <div class="col-12 col-md-4">
                <div class="text-caption text-grey-7 q-mb-xs">Лого компании</div>
                <q-img :src="company.image_url" ratio="16/9" class="q-rounded-md" />
              </div>
              <div class="col-12 col-md-8">
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">Название компании</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ company.name || 'Данные не заданы' }}</div>
                </div>
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">Направление деятельности</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ company.area_of_activity || 'Данные не заданы' }}</div>
                </div>
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">ФИО главы компании</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ company.head_full_name || 'Данные не заданы' }}</div>
                </div>
                <div class="q-mb-md">
                  <div class="text-caption text-grey-7 q-mb-xs">Договор</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ company.agreement || 'Данные не заданы' }}</div>
                </div>
                <div>
                  <div class="text-caption text-grey-7 q-mb-xs">Количество студентов</div>
                  <div class="bg-grey-3 q-pa-sm q-rounded-sm">{{ company.hire_count ?? 0 }}</div>
                </div>
              </div>
            </div>
          </div>

          <q-separator spaced />

          <!-- Темы -->
          <div class="q-gutter-lg">
            <!-- ПР -->
            <div>
              <div class="text-subtitle1 q-mb-sm">Темы производственной практики</div>
              <div class="row q-col-gutter-sm items-center">
                <q-chip
                  v-for="t in practiceThemes" :key="t.id"
                  removable class="q-mb-sm" @remove="removeTheme(t.id)"
                >{{ t.title }}</q-chip>

                <div v-if="practiceThemeInputVisible" class="col-auto">
                  <q-input dense filled v-model="inputThemeValue"
                           style="width:220px"
                           placeholder="Новая тема"
                           @keyup.enter="addTheme('ПР')" @blur="addTheme('ПР')" />
                </div>
                <q-btn v-else dense outline icon="add" label="Добавить новую тему"
                       @click="practiceThemeInputVisible = true" />
              </div>
            </div>

            <!-- ВКР -->
            <div>
              <div class="text-subtitle1 q-mb-sm">Темы ВКР</div>
              <div class="row q-col-gutter-sm items-center">
                <q-chip
                  v-for="t in vkrThemes" :key="t.id"
                  color="warning" text-color="black" removable class="q-mb-sm"
                  @remove="removeTheme(t.id)"
                >{{ t.title }}</q-chip>

                <div v-if="vkrThemeInputVisible" class="col-auto">
                  <q-input dense filled v-model="inputThemeValue"
                           style="width:220px"
                           placeholder="Новая тема"
                           @keyup.enter="addTheme('ВКР')" @blur="addTheme('ВКР')" />
                </div>
                <q-btn v-else dense outline icon="add" label="Добавить новую тему"
                       @click="vkrThemeInputVisible = true" />
              </div>
            </div>

            <!-- НИОКР -->
            <div>
              <div class="text-subtitle1 q-mb-sm">Темы НИОКР</div>
              <div class="row q-col-gutter-sm items-center">
                <q-chip
                  v-for="t in niokrThemes" :key="t.id"
                  color="negative" text-color="white" removable class="q-mb-sm"
                  @remove="removeTheme(t.id)"
                >{{ t.title }}</q-chip>

                <div v-if="niokrThemeInputVisible" class="col-auto">
                  <q-input dense filled v-model="inputThemeValue"
                           style="width:220px"
                           placeholder="Новая тема"
                           @keyup.enter="addTheme('НИОКР')" @blur="addTheme('НИОКР')" />
                </div>
                <q-btn v-else dense outline icon="add" label="Добавить новую тему"
                       @click="niokrThemeInputVisible = true" />
              </div>
            </div>
          </div>

          <q-separator spaced />

          <!-- Действия -->
          <div class="row items-center justify-between">
            <q-btn outline color="primary" icon="school" label="Добавить практику"
                   @click="addPracticeFormVisible = true" />
            <q-btn color="negative" label="Выйти" @click="logOut" />
          </div>
        </q-card>
      </div>
    </div>

    <!-- Диалог: Добавление практики -->
    <q-dialog v-model="addPracticeFormVisible" persistent>
      <q-card style="min-width: 420px; max-width: 520px">
        <q-card-section class="text-h6">Добавление новой практики</q-card-section>
        <q-separator />
        <q-card-section class="q-gutter-md">
          <q-select
            v-model="practiceForm.themes"
            :options="themes"
            option-value="id"
            option-label="title"
            use-chips multiple filled
            label="Темы"
          />
          <q-select
            v-model="practiceForm.faculty"
            :options="institutes"
            option-value="id"
            option-label="name"
            filled label="Институт"
          />
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn color="primary" label="Сохранить" @click="onConfirmAddPractice" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <UserInfoForm
      :userInfoFormVisible="userInfoFormVisible"
      :initial="user"
      @update:userInfoFormVisible="val => userInfoFormVisible = val"
      @confirm="applyUserPatch"
    />
    <!-- Кнопка в блоке "Информация о компании" -->
<!--    <q-btn-->
<!--      round color="primary" icon="edit"-->
<!--      aria-label="Редактировать компанию"-->
<!--      @click="userCompanyFormVisible = true"-->
<!--    />-->

<!--    &lt;!&ndash; ...ниже, рядом с UserInfoForm: &ndash;&gt;-->
<!--    <CompanyInfoForm-->
<!--      :userCompanyFormVisible="userCompanyFormVisible"-->
<!--      :initial="company"-->
<!--      @update:userCompanyFormVisible="val => userCompanyFormVisible = val"-->
<!--      @confirm="patch => { Object.assign(company, patch); $q.notify({type:'positive', message:'Компания обновлена (mock)'}) }"-->
<!--    />-->
  </q-page>
</template>

<style scoped>
/* без лишнего CSS — всё через классы Quasar */
</style>
