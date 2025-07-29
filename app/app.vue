<script setup lang="ts">
useSeoMeta({
  title: 'ChemistFucker™',
  ogTitle: 'ChemistFucker™',
  description: 'Award winning analytical chemist™',
  ogDescription: 'Award winning analytical chemist™',
})
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>
<template>
  <div class="h-screen flex items-center justify-center">
    <div>
      <Neon/>
      <div class="w-full flex items-center justify-center">
        <Button @click="openModal" text="Enter"/>
      </div>
    </div>

    <Modal :show="showModal" @close="closeModal"></Modal>
  </div>
</template>

<style>
body {
  background-color: black;
}
</style>