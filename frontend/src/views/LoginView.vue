<template>
  <div class="login-container">
    <div class="card">
      <h2>Zaloguj się</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Login:</label>
          <input v-model="username" type="text" required />
        </div>
        <div class="form-group">
          <label>Hasło:</label>
          <input v-model="password" type="password" required />
        </div>
        <div v-if="error" class="error">{{ error }}</div>
        <button type="submit" class="btn-primary">Zaloguj</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { loginUser } from '../authState';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await axios.post('/auth/login', {
      username: username.value,
      password: password.value
    });

    
    
    loginUser(res.data.access_token);

    
    router.push('/');

  } catch (err) {
    error.value = "Błędny login lub hasło";
  }
};
</script>

<style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    padding-top: 50px;
  }

  .card {
    padding: 30px;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 300px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  .error {
    color: red;
    margin-bottom: 10px;
    font-size: 0.9em;
  }

  .btn-primary {
    width: 100%;
    padding: 10px;
    background: #42b883;
    color: white;
    border: none;
    cursor: pointer;
  }
</style>
