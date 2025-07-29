<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0" @click="closeModal"></div>
      <img src="/images/Chemist.jpeg" alt="Award winning analytical chemist™">
    </div>
  </Teleport>
</template>
