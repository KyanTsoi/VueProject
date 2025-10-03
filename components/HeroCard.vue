<script setup lang="ts">
// ... je script blijft hetzelfde
interface ChoiceModule {
  _id: string;
  name: string;
  description: string;
  studypoints: number;
  period: number;
  location: string;
}

const emit = defineEmits(['moreInfo']);
const props = defineProps<{
  data: ChoiceModule
}>();

function onMeerInfoClick() {
  emit('moreInfo', props.data._id);
}
</script>

<template>
  <div class="hero-container">
    <div class="hero-content">
      <div class="action-buttons">
        <button class="info-button" @click="onMeerInfoClick">Meer info</button>
        <button class="enroll-button">
          Aanmelden via Osiris ↗
        </button>
        
        <slot name="actions" :moduleId="data._id"></slot>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles blijven gekoppeld aan deze component */
@import '~/assets/css/VKM.css';
</style>