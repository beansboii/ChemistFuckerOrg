<script setup lang="ts">
import Neon from "./components/Neon.vue";
import Button from "./components/Button.vue";
import { ref } from 'vue';
import Modal from './components/Modal.vue';

const showModal = ref(false);

const openModal = () => {
showModal.value = true;
};

const closeModal = () => {
showModal.value = false;
};
</script>
<template>
  <div class="mt-auto mb-auto">
    <Neon/>
      <Button @click="openModal" text="Enter"/>
  </div>

  <Modal :show="showModal" @close="closeModal"></Modal>
</template>

<style>
body {
  background-color: black;
}
</style>