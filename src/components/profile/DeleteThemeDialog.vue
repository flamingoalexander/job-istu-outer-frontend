<script setup lang="ts">



const handleDeleteTheme = async () => {
  if (themeToDelete.value) {
    await userStore.deleteTheme(themeToDelete.value.id);
  }
  themeToDelete.value = null;
  confirmationDialogVisible.value = false;
};
</script>

<template>
  <q-dialog v-model="confirmationDialogVisible">
    <q-card>
      <q-card-section> Вы действительно хотите удалить эту тему? </q-card-section>
      <q-card-actions>
        <q-btn label="Cancel" color="primary" @click="confirmationDialogVisible = false" />
        <q-btn label="Delete" color="negative" @click="handleDeleteTheme" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped></style>
