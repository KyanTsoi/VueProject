<script setup lang="ts">
import { ref } from 'vue';

interface Vkm {
  code: string;
  location: string;
  title: string;
  description: string;
}

const vkmData = ref<Vkm>({
  code: 'M04337-02',
  location: 'Breda',
  title: '1.3 Analyse van een operationeel proces',
  description: 'De module bevat drie leeruitkomsten: Productieautomatisering (7 EC), Productietechnieken (4 EC) en Continu Verbeteren (4 EC).'
});

// Stap 1: Maak de functie die de alert toont
function handleMoreInfo(vkmCode: string) {
  alert(`Je hebt geklikt op de "meer info" knop voor VKM met code: ${vkmCode}`);
}
</script>

<template>
  <div>
    <h1>Overzicht Pagina</h1>
    <p>Hieronder zie je een voorbeeld van een VKM-component.</p>

    <HeroCard :data="vkmData" @moreInfo="handleMoreInfo" />

  </div>
</template>

<style>
body {
  background-color: #f9f9f9;
}

div {
  padding: 20px;
}
</style>