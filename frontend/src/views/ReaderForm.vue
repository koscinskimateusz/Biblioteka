<template>
  <div class="container">
    <h2>Zarejestruj Czytelnika</h2>
    <form @submit.prevent="saveReader">
      <div class="form-group">
        <label>Imię:</label>
        <input v-model="form.firstName" required placeholder="Jan" />
      </div>
      <div class="form-group">
        <label>Nazwisko:</label>
        <input v-model="form.lastName" required placeholder="Kowalski" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="form.email" required placeholder="jan@example.com" />
      </div>

      <button type="submit" class="btn">Zapisz</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const form = ref({
  firstName: '',
  lastName: '',
  email: ''
});

const saveReader = async () => {
  try {
    await axios.post('/api/readers', form.value);
    // Po sukcesie wróć do listy czytelników
    router.push('/readers');
  } catch (err) {
    alert('Błąd! Być może taki email już istnieje?');
    console.error(err);
  }
};
</script>

<style scoped>
  .container {
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }

  .btn {
    background: #42b883;
    color: white;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    width: 100%;
    font-size: 16px;
  }

    .btn:hover {
      background: #3aa876;
    }
</style>
