<script setup lang="ts">
// De interface die de data beschrijft die we van de backend verwachten
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
      <div class="tags">
        <span class="tag p3">P{{ data.period }}</span>
        <span class="tag ects">{{ data.studypoints }} ECTS</span>
      </div>

      <div class="location">
        <span>📍 {{ data.location }}</span>
      </div>

      <div class="course-info">
        <div class="course-code">ID: {{ data._id }}</div>
        <h2 class="course-title">{{ data.name }}</h2>
        <p class="course-description">{{ data.description }}</p>
      </div>

      <div class="action-buttons">
        <button class="info-button" @click="onMeerInfoClick">Meer info</button>
        <button class="enroll-button">
          Aanmelden via Osiris ↗
        </button>
        <button class="favorite-button">♡</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles blijven gekoppeld aan deze component */
@import '~/assets/css/VKM.css';
</style>