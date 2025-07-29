<script setup lang="ts">
defineProps({
  text: {
    type: String,
  }
})
</script>

<template>
  <button id="btn">{{ text }}</button>
</template>

<style scoped>
button {
  z-index: -2;
  margin-top: 40px;
  padding: 10px 35px;
  border-radius: 40px;
  font-size: 30px;
  font-weight: 500;
  color: #ffffff80;
  text-shadow: none;
  background: transparent;
  border: 1px solid #ffffff80;
  transition: 0.5s ease;
}

#btn:hover,
:focus {
  color: #ffffff;
  background: #00ff77;
  border: 1px solid #00FF77FF;
  text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 20px #ffffff;
  box-shadow: 0 0 5px #00FF77FF, 0 0 20px #00FF77FF, 0 0 50px #00FF77FF,
  0 0 100px #00FF77FF;
}
</style>