<script setup lang="ts">
interface Vkm {
  code: string;
  location: string;
  title: string;
  description: string;
}

const emit = defineEmits(['moreInfo']);

// Sla het resultaat van defineProps op in de 'props' constante
const props = defineProps<{
  data: Vkm
}>();

function onMeerInfoClick() {
  console.log('Knop geklikt in HeroCard, event wordt verstuurd!');
  // Gebruik de 'props' constante om bij de data te komen
  emit('moreInfo', props.data.code);
}
</script>

<template>
  <div class="card">
    <div class="card-header">
      <span class="tag">{{ data.code }}</span>
      <span class="location-tag">{{ data.location }}</span>
    </div>
    <div class="card-body">
      <h2>{{ data.title }}</h2>
      <p>{{ data.description }}</p>
    </div>
    <div class="card-footer">
      <button class="btn-info" @click="onMeerInfoClick">Meer info</button>
      <button class="btn-aanmelden">Aanmelden via Osiris</button>
    </div>
  </div>
</template>

<style scoped>
/* ... je CSS van de vorige challenge ... */
.card {
  font-family: sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  max-width: 400px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e0e0e0;
}

.tag, .location-tag {
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
}

.tag {
  background-color: #e6dff7;
  color: #5d3b8f;
  font-weight: bold;
}

.location-tag {
  border: 1px solid #007bff;
  color: #007bff;
}

.card-body {
  padding: 16px;
}

.card-body h2 {
  margin-top: 0;
  font-size: 20px;
}

.card-body p {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
}

.card-footer {
  padding: 16px;
  display: flex;
  gap: 10px;
}

button {
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.btn-info {
  background-color: #333;
  color: white;
}

.btn-aanmelden {
  background-color: white;
  color: #333;
  border: 1px solid #333;
}
</style>