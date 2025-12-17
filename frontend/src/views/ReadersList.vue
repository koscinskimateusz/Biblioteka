<template>
  <div class="container">
    <div class="header">
      <h2>Lista Czytelników</h2>
      <router-link to="/readers/new" class="btn">Dodaj Czytelnika</router-link>
    </div>

    <table>
      <thead>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Email</th>
          <th>Data rejestracji</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reader in readers" :key="reader.id">
          <td>{{ reader.firstName }}</td>
          <td>{{ reader.lastName }}</td>
          <td>{{ reader.email }}</td>
          <td>{{ new Date(reader.createdAt).toLocaleDateString() }}</td>
        </tr>
        <tr v-if="readers.length === 0">
          <td colspan="4" style="text-align: center;">Brak czytelników.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const readers = ref([]);

const fetchReaders = async () => {
  try {
    // Używamy endpointu, który stworzyliśmy w backendzie
    const res = await axios.get('/api/readers');
    readers.value = res.data;
  } catch (err) {
    console.error("Błąd pobierania czytelników", err);
  }
};

onMounted(fetchReaders);
</script>

<style scoped>
  .container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
  }

  .btn {
    background: #42b883;
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 4px;
  }
</style>
