<template>
  <q-card flat bordered class="inst-card cursor-pointer">
    <div class="row no-wrap items-center">
      <div class="col-auto">
        <q-img :src="imageUrl" class="inst-image" />
      </div>
      <div class="col">
        <q-card-section>
          <div class="text-subtitle1 inst-name">{{ name }}</div>
        </q-card-section>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  imageUrl: string
}>()
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.inst-card {
  border-radius: 12px;
  overflow: hidden;
}

.inst-image {
  width: 100px;       /* ширина картинки */
  height: 100px;      /* квадрат */
  object-fit: contain;
}

.inst-name {
  white-space: normal;
  word-break: break-word;
  line-height: 1.4;
}
</style>
