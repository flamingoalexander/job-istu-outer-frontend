<script setup lang="ts"></script>

<template>
  <q-footer elevated class="bg-blue-8 text-white">
    <div class="q-px-md q-py-lg">
      <!-- xs: все в столбик; sm+: 2 колонки; md+: 4 колонки -->
      <div class="row q-col-gutter-lg">
        <!-- Блок 1 -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="row items-start">
            <q-btn flat round dense :to="{ path: '/' }" aria-label="На главную" class="q-mr-sm">
              <q-avatar class="lt-sm" size="88px">
                <q-img
                  src="https://www.istu.edu/upload/iblock/f55/logo_1.png"
                  alt="ИРНИТУ"
                  ratio="1"
                  spinner-color="primary"
                  loading="lazy"
                />
              </q-avatar>

              <q-avatar class="gt-xs" size="120px">
                <q-img
                  src="https://www.istu.edu/upload/iblock/f55/logo_1.png"
                  alt="ИРНИТУ"
                  ratio="1"
                  spinner-color="primary"
                  loading="lazy"
                />
              </q-avatar>
            </q-btn>

            <div class="col">
              <a href="https://www.istu.edu/" class="text-white" style="text-decoration: none">
                Федеральное государственное бюджетное образовательное учреждение высшего образования
                «Иркутский национальный исследовательский технический университет»
              </a>
            </div>
          </div>
        </div>

        <!-- Блок 2 (навигация) -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-h6 text-weight-medium q-mb-sm">Разделы</div>

          <q-list dense class="bg-transparent text-white">
            <q-item clickable v-ripple :to="{ name: 'companies' }" class="text-white">
              <q-item-section avatar><q-icon name="apartment" color="white" /></q-item-section>
              <q-item-section>Компании</q-item-section>
            </q-item>

            <q-item clickable v-ripple :to="{ name: 'internships' }" class="text-white">
              <q-item-section avatar><q-icon name="school" color="white" /></q-item-section>
              <q-item-section>Практики</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Блок 3 (карьерный + поддержка) -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-h6 text-weight-medium q-mb-sm">Центр карьеры</div>
          <div class="text-body2">
            Режим работы: пн–пт<br />
            Часы приема: 8:30–17:00, обед: 12:00–12:30<br />
            Расположение: г. Иркутск, ул. Лермонтова, 83, главный корпус ИРНИТУ, ауд.: Д-217, И-217,
            219<br />
            Телефон: (3952) 40-50-57, 40-56-90, 40-52-13<br />
            E-mail:
            <a href="mailto:job@istu.edu" class="text-white">job@istu.edu</a>
          </div>

          <div class="text-h6 text-weight-medium q-mt-md q-mb-sm">Техподдержка</div>
          <div class="text-body2">
            Telegram: <a href="https://t.me/alvkn0" class="text-white">@alvkn0</a><br />
            Telegram: <a href="https://t.me/pleiada01" class="text-white">@pleiada01</a><br />
            Telegram: <a href="https://t.me/a_anoshko" class="text-white">@a_anoshko</a><br />
          </div>
        </div>

        <!-- Блок 4 (организация) -->
        <div class="col-12 col-sm-6 col-md-3">
          <div class="text-h6 text-weight-medium q-mb-sm">Организация</div>
          <div class="text-body2">
            664074, г. Иркутск, ул. Лермонтова, 83<br />
            Телефон: +7 (3952) 405-000<br />
            Справочная: +7 (3952) 405-009<br />
            E-mail:
            <a href="mailto:info@istu.edu" class="text-white">info@istu.edu</a>
          </div>
        </div>
      </div>

      <q-separator spaced dark />

      <!-- Нижняя строка -->
      <div class="row items-center justify-between q-col-gutter-md">
        <div class="col-12 col-sm-auto text-body2 text-grey-3">
          © {{ new Date().getFullYear() }} ИРНИТУ
        </div>

        <div class="col-12 col-sm-auto">
          <div class="row q-gutter-sm">
            <q-btn
              flat
              dense
              no-caps
              class="text-white"
              type="a"
              href="https://www.istu.edu/"
              target="_blank"
              rel="noopener"
              label="Сайт ИРНИТУ"
            />
            <q-btn
              flat
              dense
              no-caps
              class="text-white"
              type="a"
              href="mailto:info@istu.edu"
              label="Написать"
            />
          </div>
        </div>
      </div>
    </div>
  </q-footer>
</template>
