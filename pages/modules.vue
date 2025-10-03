<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { authService } from '~/services/auth.service';

// Interfaces
interface Tag { _id: string; name: string; }
interface ChoiceModule {
  _id: string;
  name: string;
  description: string;
  studypoints: number; // Toegevoegd
  period: number;      // Toegevoegd
  location: string;    // Toegevoegd
  tags: Tag[];
}

const modules = ref<ChoiceModule[]>([]);
const allTags = ref<Tag[]>([]);
const selectedTags = ref<Set<string>>(new Set());
const studentShortlist = ref<Set<string>>(new Set());

// US-3: Filterlogica
const filteredModules = computed(() => {
  if (selectedTags.value.size === 0) {
    return modules.value;
  }
  return modules.value.filter(module =>
    module.tags.some(tag => selectedTags.value.has(tag.name))
  );
});

function toggleTag(tagName: string) {
  if (selectedTags.value.has(tagName)) {
    selectedTags.value.delete(tagName);
  } else {
    selectedTags.value.add(tagName);
  }
}

// US-4: Favorietenlogica
async function toggleFavorite(moduleId: string) {
  const token = localStorage.getItem('token');
  if (!token) return; // Niet ingelogd

  const isFavorite = studentShortlist.value.has(moduleId);
  const studentId = authService.currentUserValue?.id;
  
  try {
    // API call om toe te voegen/verwijderen
    // Dit endpoint moeten we nog maken in de backend
    await axios.post(`http://localhost:3001/api/students/${studentId}/shortlist`, 
        { moduleId, action: isFavorite ? 'remove' : 'add' },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    // Update de UI direct
    if (isFavorite) {
        studentShortlist.value.delete(moduleId);
    } else {
        studentShortlist.value.add(moduleId);
    }
  } catch (error) {
      console.error("Fout bij bijwerken favoriet:", error);
  }
}

onMounted(async () => {
  // Haal alle modules en tags op
  const [modulesRes, tagsRes] = await Promise.all([
    axios.get('http://localhost:3001/api/modules'),
    axios.get('http://localhost:3001/api/tags') // Maak dit endpoint
  ]);
  modules.value = modulesRes.data;
  allTags.value = tagsRes.data;

  // Haal favorieten van de student op
  // ...
});
</script>

<template>
  <div>
    <h1>Keuzemodules</h1>
    <div class="filters">
      <button v-for="tag in allTags" :key="tag._id" @click="toggleTag(tag.name)" :class="{ active: selectedTags.has(tag.name) }">
        {{ tag.name }}
      </button>
    </div>

    <div v-if="filteredModules.length > 0" class="card-list">
      <HeroCard v-for="module in filteredModules" :key="module._id" :data="module">
        <template #actions="{ moduleId }">
           <button class="favorite-button" @click="toggleFavorite(moduleId)">
              {{ studentShortlist.has(moduleId) ? '❤️' : '♡' }}
           </button>
        </template>
      </HeroCard>
    </div>
    <div v-else>
      <p>Er zijn geen modules gevonden die overeenkomen met je interesses.</p>
    </div>
  </div>
</template>

<style scoped>
.filters button.active {
    background-color: #6b21a8;
    color: white;
}
</style>