<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleRegister = async () => {
  try {
    await axios.post('http://localhost:3001/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
    });
    router.push('/login'); // Stuur door naar login na succes
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Registratie mislukt';
  }
};
</script>

<template>
  <div>
    <h1>Registreren</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="name" type="text" placeholder="Naam" required />
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Wachtwoord" required />
      <button type="submit">Registreren</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>