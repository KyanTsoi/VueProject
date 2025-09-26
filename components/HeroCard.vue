<script setup lang="ts">
// De interface die de data beschrijft die we verwachten
interface Vkm {
  code: string;
  location: string;
  title: string;
  description: string;
  period: string;
  ects: number;
  language: string;
  imageUrl: string;
}

const emit = defineEmits(['moreInfo']);
const props = defineProps<{
  data: Vkm
}>();

function onMeerInfoClick() {
  emit('moreInfo', props.data.code);
}
</script>

<template>
  <div class="hero-container">
    <div class="hero-image">
      <img :src="data.imageUrl" alt="Afbeelding van het proces">
    </div>
    <div class="hero-content">
      <div class="tags">
        <span class="tag p3">{{ data.period }}</span>
        <span class="tag ects">{{ data.ects }} ECTS</span>
        <span class="tag nl">{{ data.language }}</span>
      </div>

      <div class="location">
        <span>📍 {{ data.location }}</span>
      </div>

      <div class="course-info">
        <div class="course-code">{{ data.code }}</div>
        <h2 class="course-title">{{ data.title }}</h2>
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
@import '~/assets/css/VKM.css';
</style>