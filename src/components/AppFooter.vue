<script setup lang="ts"></script>

<template>
  <q-footer elevated class="bg-blue-8 text-white footer-animated">
    <div class="row">
      <div class="col-3">
        <div class="q-ma-md">
          <q-btn flat round dense :to="{ path: '/' }" aria-label="На главную" class="q-mr-sm">
            <q-avatar size="150px">
              <q-img
                src="https://www.istu.edu/upload/iblock/f55/logo_1.png"
                alt="ИРНИТУ"
                ratio="1"
                spinner-color="primary"
                loading="lazy"
              />
            </q-avatar>
          </q-btn>
        </div>
        <div class="q-ma-lg">
          <a href="https://www.istu.edu/" class="text-white">
            Федеральное Государственное Бюджетное Образовательное Учреждение высшего образования
            "Иркутский Национальный Исследовательский Технический Университет"
          </a>
        </div>
      </div>

      <div class="col-3">
        <div class="q-ma-md">
          <router-link :to="{ name: 'companies' }" class="text-white text-h5">
            Компании
          </router-link>
        </div>
        <div class="q-ma-md">
          <router-link :to="{ name: 'internships' }" class="text-white text-h5">
            Практики
          </router-link>
        </div>
      </div>

      <div class="col-3">
        <div class="q-ma-md text-h5">Центр карьеры:</div>
        <div class="q-ma-md">
          Режим работы: понедельник – пятница<br />
          Часы приема: 8:30-17:00, перерыв на обед: 12:00-12:30<br />
          Расположение: г. Иркутск, ул. Лермонтова, 83, главный корпус ИРНИТУ, ауд.: Д-217, И-217,
          219<br />
          Телефон: (3952) 40-50-57, 40-56-90, 40-52-13<br />
          E-mail: <a href="mailto:job@istu.edu" style="color: white !important">job@istu.edu</a>
        </div>
        <div class="q-ma-md text-h5">Техническая поддержка:</div>
        <div class="q-ma-md">
          Telegram: <a href="https://t.me/alvkn0" style="color: white !important">@alvkn0</a><br />
          Telegram: <a href="https://t.me/pleiada01" style="color: white !important">@pleiada01</a
          ><br />
          Telegram: <a href="https://t.me/a_anoshko" style="color: white !important">@a_anoshko</a
          ><br />
        </div>
      </div>

      <div class="col-3">
        <div class="q-ma-md text-h5">Организация:</div>
        <div class="q-ma-md">
          664074, г. Иркутск ул. Лермонтова 83<br />
          Телефон: +7 (3952) 405-000<br />
          Справочная: +7 (3952) 405-009<br />
          E-mail: <a href="mailto:info@istu.edu" style="color: white !important">info@istu.edu</a>
        </div>
      </div>
    </div>
  </q-footer>
</template>
<style scoped></style>
