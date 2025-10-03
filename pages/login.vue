<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { authService } from '~/services/auth.service';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      email: email.value,
      password: password.value,
    });
    // Gebruik de service om de token op te slaan
    authService.setToken(response.data.token);
    router.push('/modules'); // Stuur door naar de modules pagina
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Inloggen mislukt';
  }
};
</script>

<template>
  <div>
    <h1>Inloggen</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="E-mail" required />
      <input v-model="password" type="password" placeholder="Wachtwoord" required />
      <button type="submit">Inloggen</button>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </form>
  </div>
</template>