<script setup lang="ts">
import { ref } from 'vue';

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

// Stap 1: Maak een array (lijst) van VKM-objecten
const vkmList = ref<Vkm[]>([
  {
    code: 'M04337-02',
    location: 'Breda',
    title: '1.3 Analyse van een operationeel proces',
    description: 'De module bevat drie leeruitkomsten: Productieautomatisering (7 EC), Productietechnieken (4 EC) en Continu Verbeteren (4 EC).',
    period: 'P3',
    ects: 15,
    language: 'NL',
    imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop'
  },
  {
    code: 'M01234-01',
    location: 'Den Bosch',
    title: '2.1 Datamodelleren en Databases',
    description: 'Leer de fundamenten van relationele databases, SQL en datamodelleringstechnieken voor complexe systemen.',
    period: 'P1',
    ects: 10,
    language: 'NL',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop'
  },
  {
    code: 'M05678-03',
    location: 'Breda',
    title: '3.4 Cloud & DevOps Engineering',
    description: 'Verdiep je in cloud-platformen zoals AWS en Azure, en leer de principes van CI/CD en geautomatiseerde deployments.',
    period: 'P4',
    ects: 15,
    language: 'EN',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop'
  }
]);

function handleMoreInfo(vkmCode: string) {
  alert(`Je hebt geklikt op de "meer info" knop voor VKM met code: ${vkmCode}`);
}
</script>

<template>
  <div class="page-container">
    <h1>Overzicht VKM-Modules</h1>

    <div class="card-list">
      <HeroCard 
        v-for="vkm in vkmList" 
        :key="vkm.code"
        :data="vkm" 
        @moreInfo="handleMoreInfo" 
      />
    </div>

  </div>
</template>

<style>
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
</style>