<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Vergeet niet 'npm install axios' uit te voeren

// Interface die de datastructuur van de backend matcht
interface ChoiceModule {
  _id: string;
  name: string;
  description: string;
  studypoints: number;
  period: number;
  location: string;
}

const modules = ref<ChoiceModule[]>([]);
const loading = ref(true);

// Lifecycle hook om data op te halen zodra de component laadt
onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3001/api/modules');
    modules.value = response.data;
  } catch (error) {
    console.error("Fout bij het ophalen van modules:", error);
  } finally {
    loading.value = false;
  }
});

function handleMoreInfo(moduleId: string) {
  alert(`Je hebt geklikt op "meer info" voor module met ID: ${moduleId}`);
}
</script>

<template>
  <div class="page-container">
    <h1>Overzicht Keuzemodules</h1>

    <div v-if="loading" class="loading-message">
      Modules worden geladen...
    </div>

    <div v-else class="card-list">
      <HeroCard
        v-for="module in modules"
        :key="module._id"
        :data="module"
        @moreInfo="handleMoreInfo"
      />
    </div>
  </div>
</template>

<style>
/* Je bestaande styling kan hier blijven */
body {
  background-color: #f9f9f9;
  font-family: sans-serif;
}

.page-container {
  padding: 20px;
}

.card-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.loading-message {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>