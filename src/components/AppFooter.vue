<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isFooterVisible = ref(false)

const handleScroll = () => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100
  if (scrollPercent > 90) {
    isFooterVisible.value = true
  } else {
    isFooterVisible.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() 
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <q-footer 
    v-show="isFooterVisible"
    reveal 
    elevated 
    class="bg-blue-8 text-white footer-animated"
    :class="{ 'footer-hidden': !isFooterVisible }"
  >
    <div class="row">
      <div class="col-3">
        <q-toolbar>
          <q-img 
            src="/icons/favicon-96x96.png"
            class="logo"
          ></q-img>
        </q-toolbar>
        <q-toolbar class="institute_div">
          <div class="q-ml-md">
            <a 
              href="https://www.istu.edu/" 
              style="color: white !important;"
            >
              Федеральное Государственное Бюджетное Образовательное Учреждение высшего образования "Иркутский Национальный Исследовательский Технический Университет"
            </a>
          </div>
        </q-toolbar>
      </div>
      
      <div class="col-3">
        <div class="q-ml-md">
          <router-link :to="{ name: 'companies' }" class="title">
            Компании
          </router-link>
        </div>
        <div class="q-ml-md">
          <router-link :to="{ name: 'internships' }" class="title">
            Практики
          </router-link>
        </div>
      </div>
      
      <div class="col-3">
        <div class="q-ml-md title">
          Центр карьеры:
        </div>
        <div class="q-ml-md additional_text">
          Режим работы: понедельник – пятница<br>
          Часы приема: 8:30-17:00, перерыв на обед: 12:00-12:30<br>
          Расположение: г. Иркутск, ул. Лермонтова, 83, главный корпус ИРНИТУ, ауд.: Д-217, И-217, 219<br>
          Телефон: (3952) 40-50-57, 40-56-90, 40-52-13<br>
          E-mail: <a href="mailto:job@istu.edu" style="color: white !important;">job@istu.edu</a> 
        </div>
        <div class="q-ml-md title">
          Техническая поддержка:
        </div>
        <div class="q-ml-md additional_text">
          Telegram: <a href="https://t.me/alvkn0" style="color: white !important;">@alvkn0</a><br>
          Telegram: <a href="https://t.me/pleiada01" style="color: white !important;">@pleiada01</a><br>
          Telegram: <a href="https://t.me/a_anoshko" style="color: white !important;">@a_anoshko</a><br>
        </div>
      </div>
      
      <div class="col-3">
        <div class="q-ml-md title">
          Организация:
        </div>
        <div class="q-ml-md additional_text">
          664074, г. Иркутск ул. Лермонтова 83<br>
          Телефон: +7 (3952) 405-000<br>
          Справочная: +7 (3952) 405-009<br>
          E-mail: <a href="mailto:info@istu.edu" style="color: white !important;">info@istu.edu</a> 
        </div>
      </div>
    </div>
  </q-footer>
</template>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
  margin-top: 25px;
}

.institute_div {
  flex: 1; 
  font-size: 0.9rem;
  line-height: 1.4;
  max-width: 600px;
  margin-top: 40px; 
  margin-bottom: 20px;
}

.title {
  font-size: 22px; 
  font-weight: 500; 
  line-height: 1.5;
  color: white !important; 
  margin-top: 25px;
  display: inline-block;
}

.additional_text {
  font-size: 16px;
  font-weight: 100;
  line-height: 1.5;
  margin-top: 8px;
}

/* Стили для ссылок в additional_text */
.additional_text a {
  color: white !important;
  text-decoration: none;
}

.additional_text a:hover {
  text-decoration: underline;
}

/* Анимации футера */
.footer-animated {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.footer-hidden {
  opacity: 0;
  transform: translateY(20px);
  pointer-events: none;
}
</style>