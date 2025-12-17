<template>
  <div class="container">
    <h2>Wypożyczenia</h2>

    <div class="box">
      <h3>Nowe Wypożyczenie</h3>
      <select v-model="newLoan.bookId">
        <option disabled value="">Wybierz książkę</option>
        <option v-for="b in books" :key="b.id" :value="b.id">{{ b.title }}</option>
      </select>

      <select v-model="newLoan.readerId">
        <option disabled value="">Wybierz czytelnika</option>
        <option v-for="r in readers" :key="r.id" :value="r.id">{{ r.lastName }} {{ r.firstName }}</option>
      </select>

      <button @click="createLoan">Wypożycz</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Książka</th>
          <th>Czytelnik</th>
          <th>Data wypożyczenia</th>
          <th>Akcja</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="loan in loans" :key="loan.id">
          <td>{{ loan.book?.title }}</td>
          <td>{{ loan.reader?.firstName }} {{ loan.reader?.lastName }}</td>
          <td>{{ new Date(loan.borrowedAt).toLocaleDateString() }}</td>
          <td>
            <button @click="returnBook(loan.id)">Zwróć</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const loans = ref([]);
const books = ref([]);
const readers = ref([]);
const newLoan = ref({ bookId: '', readerId: '' });

const loadData = async () => {
  const [lRes, bRes, rRes] = await Promise.all([
    axios.get('/api/loans'),
    axios.get('/api/books?limit=100'), // Pobieramy więcej do listy wyboru
    axios.get('/api/readers')
  ]);
  loans.value = lRes.data;
  books.value = bRes.data.data;
  readers.value = rRes.data;
};

const createLoan = async () => {
  if(!newLoan.value.bookId || !newLoan.value.readerId) return;
  await axios.post('/api/loans', newLoan.value);
  newLoan.value = { bookId: '', readerId: '' };
  loadData(); // Odśwież listę
};

const returnBook = async (id) => {
  await axios.patch(`/api/loans/${id}/return`);
  loadData();
};

onMounted(loadData);
</script>

<style scoped>
  .box {
    background: #f9f9f9;
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }

  select, button {
    margin-right: 10px;
    padding: 5px;
  }
</style>
